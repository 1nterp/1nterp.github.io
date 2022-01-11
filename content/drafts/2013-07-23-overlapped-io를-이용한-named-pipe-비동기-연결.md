---
title: Overlapped I/O를 이용한 Named Pipe 비동기 연결
author: interp
type: post
date: 2013-07-23T11:17:52+00:00
draft: true
private: true
url: /overlapped-io를-이용한-named-pipe-비동기-연결/
categories:
  - 프로그래밍

---
# 소개

<p style="text-align: justify;">
  Windows Named Pipe 통신을 Overlapped I/O로 해 보겠습니다. 이게 왜 필요할까요? Unix에서는 Domain Socket이라는 아주 매력적인(?) IPC 기법이 존재합니다. 소켓 인터페이스와 동일하니 사용하기도 쉽습니다. 그런데, 여기서 지원하는&nbsp;select() 함수와 같은 기능을 하는 함수가 Windows Named Pipe 인터페이스에서는 존재하지 않습니다.&nbsp;WaitForSingleObject()를 쓰면 되잖아?! 이 함수는 애석하게도 이벤트 객체는 기다려주는데, Named Pipe 객체는 기다려주질 않습니다.
</p>

그러면, 발상을 전환해서! Named Pipe가 이벤트도 같이 등록해두면 어떨까요? 한 쪽에서 메시지를 보내면 이벤트가 땡~ 그러면 이 쪽 이벤트로 WaitForSingleObject()를 할 수 있겠죠? 바로 그런 아이디어에서 제공되는 개념, Overlapped I/O를 소개합니다.

백문이 불여일견, 먼저 코드부터 보시죠. 먼저 보실 것은 서버 프로그램입니다.

[#M_소스 보기|소스 닫기|

<pre class="brush:cpp">#include &lt;windows.h> 
#include &lt;stdio.h>
#include &lt;tchar.h>
#include &lt;strsafe.h>
 
#define CONNECTING_STATE 0 
#define READING_STATE 1 
#define WRITING_STATE 2 
#define INSTANCES 1 
#define PIPE_TIMEOUT 5000
#define BUFSIZE 4096
 
typedef struct 
{ 
    OVERLAPPED oOverlap; 
    HANDLE hPipeInst; 
    TCHAR chRequest[BUFSIZE]; 
    DWORD cbRead;
    TCHAR chReply[BUFSIZE];
    DWORD cbToWrite; 
    DWORD dwState; 
    BOOL fPendingIO; 
} PIPEINST, *LPPIPEINST; 


DWORD ConnectOverlapped(HANDLE, LPOVERLAPPED); 
VOID  GetAnswerToRequest(LPPIPEINST); 
DWORD ReadOverlapped(HANDLE, LPOVERLAPPED, LPVOID, DWORD);
DWORD WriteOverlapped(HANDLE, LPOVERLAPPED, LPVOID, DWORD);

PIPEINST Pipe; 
HANDLE hEvents; 

int _tmain(VOID) 
{ 
    DWORD dwWait, cbRet, dwErr, connNum; 
    BOOL fSuccess; 
    LPTSTR lpszPipename = TEXT("\\\\.\\pipe\\mynamedpipe"); 

    hEvents = CreateEvent( 
                    NULL,    // default security attribute 
                    TRUE,    // manual-reset event 
                    TRUE,    // initial state = signaled 
                    NULL);   // unnamed event object 

    if (hEvents == NULL) 
    {
        printf("CreateEvent failed with %d.\n", GetLastError()); 
        return 0;
    }

    Pipe.oOverlap.hEvent = hEvents; 

    Pipe.hPipeInst = CreateNamedPipe( 
                        lpszPipename,            // pipe name 
                        PIPE_ACCESS_DUPLEX |     // read/write access 
                        FILE_FLAG_OVERLAPPED,    // overlapped mode 
                        PIPE_TYPE_BYTE |         // message-type pipe 
                        PIPE_WAIT,               // blocking mode 
                        INSTANCES,               // number of instances 
                        BUFSIZE*sizeof(TCHAR),   // output buffer size 
                        BUFSIZE*sizeof(TCHAR),   // input buffer size 
                        PIPE_TIMEOUT,            // client time-out 
                        NULL);                   // default security attributes 

    if (Pipe.hPipeInst == INVALID_HANDLE_VALUE) 
    {
        _tprintf("CreateNamedPipe failed with %d.\n", GetLastError());
        return 0;
    }
    
    // Connect
    connNum = ConnectOverlapped( Pipe.hPipeInst, &Pipe.oOverlap ); 

    switch( connNum )
    {
        case 0:
            _tprintf("Connection Timeout...\n");
            return 0;
        case -1:
            _tprintf("Connection Error %d.\n", GetLastError()); 
            return 0;
        default:
            break;
    }
    
    while(1)
    {
        // Read
        connNum = ReadOverlapped( 
                    Pipe.hPipeInst, 
                    &Pipe.oOverlap, 
                    Pipe.chRequest, 
                    BUFSIZE*sizeof(TCHAR) ); 
                    
        switch( connNum )
        {
            case 0:
                _tprintf("Read Timeout...\n");
                CloseHandle(Pipe.hPipeInst);
                return 0;
            case -1:
                _tprintf("Read Error %d.\n", GetLastError()); 
                CloseHandle(Pipe.hPipeInst);
                return 0;
            default:
                break;
        }
        
        GetAnswerToRequest(&Pipe); 
        
        // Write
        connNum = WriteOverlapped( 
                    Pipe.hPipeInst, 
                    &Pipe.oOverlap, 
                    Pipe.chReply, 
                    Pipe.cbToWrite ); 
                    
        switch( connNum )
        {
            case 0:
                _tprintf("Read Timeout...\n");
                CloseHandle(Pipe.hPipeInst);
                return 0;
            case -1:
                _tprintf("Read Error %d.\n", GetLastError()); 
                CloseHandle(Pipe.hPipeInst);
                return 0;
            default:
                break;
        }  
        
        _tprintf("Workout is completed!\n");
    }

    return 0; 
} 

// Connection
DWORD ConnectOverlapped(HANDLE hPipe, LPOVERLAPPED lpo) 
{ 
    BOOL fConnected, fPendingIO, fSuccess = FALSE; 
    DWORD dwWait;
    DWORD sTransferred;
    DWORD retCode = 1;

    // Start an overlapped connection for this pipe instance. 
    fConnected = ConnectNamedPipe(hPipe, lpo); 

    // Overlapped ConnectNamedPipe should return zero. 
    if( fConnected != 0 ) 
    {
        printf("ConnectNamedPipe failed with %d.\n", GetLastError()); 
        retCode = -1;
    }
    else
    {
        switch (GetLastError()) 
        { 
            // The overlapped connection in progress. 
            case ERROR_IO_PENDING: 
                fPendingIO = TRUE; 
                break; 
            // Client is already connected
            case ERROR_PIPE_CONNECTED: 
                fPendingIO = FALSE; 
                break; 
            // If an error occurs during the connect operation... 
            default: 
                printf("ConnectNamedPipe failed with %d.\n", GetLastError());
                retCode = -1;
        } 
    }
    
    // in connection mode, we don't have to put while loop in the code.
    if(fPendingIO == TRUE)
    {
        dwWait = WaitForSingleObject( 
                    lpo-&gt;hEvent,   // array of event objects 
                    5000 );        // waits 5sec

        if( dwWait == WAIT_TIMEOUT )
        {
            retCode = 0;
        }
        else
        {
            fSuccess = GetOverlappedResult( 
                            hPipe,  // handle to pipe 
                            lpo,    // OVERLAPPED structure 
                            &sTransferred, // bytes transferred 
                            FALSE ); // do not wait

            if( fSuccess == TRUE )
            {
                // Connection established.
                retCode = 1;
            }
            else
            {
                // Event is signaled, so it is not ERROR_IO_INCOMPLETE
                retCode = -1;
            }
        }
    }

    return retCode; 
}

// Read
DWORD ReadOverlapped(HANDLE hPipe, LPOVERLAPPED lpo, LPVOID buffer, DWORD aBufferSize) 
{ 
/* - ReadFile()
        if( pending condition ) state becomes pending
        else state becomes not-pending, and return.
 * while loop
 * - WaitFor
 * - if( previous state is pending ) 
        OverlapResult()
        if( pending condition ) continue;
        else =&gt; return
 */
    BOOL fConnected, fPendingIO, fSuccess = FALSE; 
    DWORD dwWait;
    DWORD dwErr;
    DWORD sTransferred;
    DWORD numByteRead;
    DWORD cbRet;
    
    DWORD retCode = 0;
    
    fSuccess = ReadFile( 
                    hPipe, 
                    buffer, 
                    aBufferSize, 
                    &numByteRead, 
                    lpo); 
                    
    if (fSuccess && numByteRead != 0) 
    {
        fPendingIO = FALSE; 
        _tprintf("Reading Pending OFF\n");
    }
    else
    {
        dwErr = GetLastError(); 
        if (! fSuccess && (dwErr == ERROR_IO_PENDING)) 
        { 
            fPendingIO = TRUE; 
            _tprintf("Reading Pending ON\n");
            // it waits below..
        }
        else
        {
            retCode = -1; // error
        }
    }    

    if(fPendingIO == TRUE)
    {
        while(1)
        {
            dwWait = WaitForSingleObject( 
                        lpo-&gt;hEvent,   // array of event objects 
                        5000 );        // waits 5sec
                        
            if( dwWait == WAIT_TIMEOUT )
            {
                retCode = 0;
                break;
            }
            else
            {
                    fSuccess = GetOverlappedResult( 
                            hPipe,   // handle to pipe 
                            lpo,     // OVERLAPPED structure 
                            &cbRet,  // bytes transferred 
                            FALSE);  // do not wait
                            
                    // if (pending condition)
                    if (! fSuccess || cbRet == 0) 
                    { 
                        continue;
                    }
                    else
                    {
                        numByteRead = cbRet;
                        retCode = 1;
                        break;
                    }
            }
        }
    }
    else
    {
        retCode = 1;
    }

    return retCode; 
}

// Write
DWORD WriteOverlapped(HANDLE hPipe, LPOVERLAPPED lpo, LPVOID buffer, DWORD aBufferSize) 
{ 
/* same as read */
    BOOL fConnected, fPendingIO, fSuccess = FALSE; 
    DWORD dwWait;
    DWORD dwErr;
    DWORD sTransferred;
    DWORD numByteWrite;
    DWORD cbRet;
    
    DWORD retCode = 0;
                    
    fSuccess = WriteFile( 
                    hPipe, 
                    buffer, 
                    aBufferSize, 
                    &numByteWrite, 
                    lpo); 
                    
    if (fSuccess && numByteWrite == aBufferSize) 
    {
        fPendingIO = FALSE; 
    }
    else
    {
        dwErr = GetLastError(); 
        if (! fSuccess && (dwErr == ERROR_IO_PENDING)) 
        { 
            fPendingIO = TRUE; 
            // it waits below..
        }
        else
        {
            retCode = -1; // error
        }
    }    

    if(fPendingIO == TRUE)
    {
        while(1)
        {
            dwWait = WaitForSingleObject( 
                        lpo-&gt;hEvent,   // array of event objects 
                        5000 );        // waits 5sec
                        
            if( dwWait == WAIT_TIMEOUT )
            {
                retCode = 0;
                break;
            }
            else
            {
                    fSuccess = GetOverlappedResult( 
                            hPipe,   // handle to pipe 
                            lpo,     // OVERLAPPED structure 
                            &cbRet,  // bytes transferred 
                            FALSE);  // do not wait
                            
                    // if (pending condition)
                    if (! fSuccess || cbRet != aBufferSize) 
                    { 
                        continue;
                    }
                    else
                    {
                        retCode = 1;
                        break;
                    }
            }
        }
    }
    else
    {
        retCode = 1;
    }

    return retCode; 
}

VOID GetAnswerToRequest(LPPIPEINST pipe)
{
    _tprintf( TEXT("[%d] %s\n"), pipe-&gt;hPipeInst, pipe-&gt;chRequest);
    StringCchCopy( pipe-&gt;chReply, BUFSIZE, TEXT("Default answer from server") );
    pipe-&gt;cbToWrite = (lstrlen(pipe-&gt;chReply)+1)*sizeof(TCHAR);
}

&lt;/strsafe.h>&lt;/tchar.h>&lt;/stdio.h>&lt;/windows.h></pre></p> 

_M#]

다음으로 클라이언트 프로그램.

[#M_소스 보기|소스 닫기|

<pre class="brush:cpp">#include &lt;windows.h> 
#include &lt;stdio.h>
#include &lt;conio.h>
#include &lt;tchar.h>

#define BUFSIZE 512
 
int _tmain(int argc, TCHAR *argv[]) 
{ 
   HANDLE hPipe; 
   LPTSTR lpvMessage=TEXT("Default message from client."); 
   TCHAR  chBuf[BUFSIZE]; 
   BOOL   fSuccess = FALSE; 
   DWORD  cbRead, cbToWrite, cbWritten, dwMode; 
   LPTSTR lpszPipename = TEXT("\\\\.\\pipe\\mynamedpipe"); 

   if( argc &gt; 1 )
      lpvMessage = argv[1];
 
// Try to open a named pipe; wait for it, if necessary. 
 
   while (1) 
   { 
      hPipe = CreateFile( 
         lpszPipename,   // pipe name 
         GENERIC_READ |  // read and write access 
         GENERIC_WRITE, 
         0,              // no sharing 
         NULL,           // default security attributes
         OPEN_EXISTING,  // opens existing pipe 
         0,              // default attributes 
         NULL);          // no template file 
 
      // Break if the pipe handle is valid. 
      if (hPipe != INVALID_HANDLE_VALUE) 
         break; 
 
      // Exit if an error other than ERROR_PIPE_BUSY occurs. 
 
      if (GetLastError() != ERROR_PIPE_BUSY) 
      {
         _tprintf( TEXT("Could not open pipe. GLE=%d\n"), GetLastError() ); 
         return -1;
      }
 
      // All pipe instances are busy, so wait for 20 seconds. 
 
      if ( ! WaitNamedPipe(lpszPipename, 20000)) 
      { 
         printf("Could not open pipe: 20 second wait timed out."); 
         return -1;
      } 
   } 
 
   cbToWrite = (lstrlen(lpvMessage)+1)*sizeof(TCHAR);
   _tprintf( TEXT("Sending %d byte message: \"%s\"\n"), cbToWrite, lpvMessage);  
   
   fSuccess = WriteFile( 
      hPipe,                  // pipe handle 
      lpvMessage,             // message 
      cbToWrite,              // message length 
      &cbWritten,             // bytes written 
      NULL);                  // not overlapped 

   if ( ! fSuccess) 
   {
      _tprintf( TEXT("WriteFile to pipe failed. GLE=%d\n"), GetLastError() ); 
      return -1;
   }
   
   printf("\nMessage sent to server, receiving reply as follows:\n");
 
   do 
   { 
   // Read from the pipe. 
      fSuccess = ReadFile( 
         hPipe,    // pipe handle 
         chBuf,    // buffer to receive reply 
         BUFSIZE*sizeof(TCHAR),  // size of buffer 
         &cbRead,  // number of bytes read 
         NULL);    // not overlapped 
 
      if ( ! fSuccess && GetLastError() != ERROR_MORE_DATA )
         break; 
 
      _tprintf( TEXT("\"%s\"\n"), chBuf ); 
   } while ( ! fSuccess);  // repeat loop if ERROR_MORE_DATA 

   if ( ! fSuccess)
   {
      _tprintf( TEXT("ReadFile from pipe failed. GLE=%d\n"), GetLastError() );
      return -1;
   }
   
   Sleep(3000);
   
   // once again.
   
    fSuccess = WriteFile( 
      hPipe,                  // pipe handle 
      lpvMessage,             // message 
      cbToWrite,              // message length 
      &cbWritten,             // bytes written 
      NULL);                  // not overlapped 

   if ( ! fSuccess) 
   {
      _tprintf( TEXT("WriteFile to pipe failed. GLE=%d\n"), GetLastError() ); 
      return -1;
   }
   
   printf("\nMessage sent to server, receiving reply as follows:\n");
 
   do 
   { 
   // Read from the pipe. 
      fSuccess = ReadFile( 
         hPipe,    // pipe handle 
         chBuf,    // buffer to receive reply 
         BUFSIZE*sizeof(TCHAR),  // size of buffer 
         &cbRead,  // number of bytes read 
         NULL);    // not overlapped 
 
      if ( ! fSuccess && GetLastError() != ERROR_MORE_DATA )
         break; 
 
      _tprintf( TEXT("\"%s\"\n"), chBuf ); 
   } while ( ! fSuccess);  // repeat loop if ERROR_MORE_DATA 

   if ( ! fSuccess)
   {
      _tprintf( TEXT("ReadFile from pipe failed. GLE=%d\n"), GetLastError() );
      return -1;
   }

   printf("\n&lt;end of="" message,="" press="" enter="" to="" terminate="" connection="" and="" exit="">");
   CloseHandle(hPipe); 
 
   return 0; 
}
&lt;/end>&lt;/tchar.h>&lt;/conio.h>&lt;/stdio.h>&lt;/windows.h></pre></p> 

_M#]

두 프로그램을 컴파일 해서, 실행을 해 봅시다.

<pre class="brush:plain">&gt; cl.exe Server.cpp
&gt; cl.exe Client.cpp
&gt; Server.exe
&gt; (다른 창에서) Client.exe
</pre>

클라이언트는 한 번 메세지를 보내고, 서버는 클라이언트의 메세지를 받는 즉시 되돌려 보내고 다시 기다리고를 반복합니다. 물론, 5초동안 클라이언트 메세지가 오지 않으면 서버는 기다리다 지쳐 종료합니다. 어때요, select() 함수처럼 상대방이 뭔가 하려고 하는구나 감지할 수 있는 코드가 완성되었습니다.
  
select() 함수와 Overlapped I/O의 원리를 파면 더 재미있는 사실들이 많으니 한 번 보시는 걸 추천합니다.