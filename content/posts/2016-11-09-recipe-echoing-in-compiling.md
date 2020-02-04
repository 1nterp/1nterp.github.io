---
title: Recipe Echoing in Compiling
author: interp
type: post
date: 2016-11-09T02:40:58+00:00
url: /recipe-echoing-in-compiling/
dsq_thread_id:
  - 5711534169
categories:
  - 개발환경

---
GNU Make에서는 ‘[Recipe Echoing][1]’ 이라고 부르는데, 아무튼 일반적으로 나오는 컴파일 명령어 줄을 보고 싶지 않고 Warning/Error 만 확인하고자 할 때 사용할 수 있는 명령을 정리한다. 완벽한 해결책은 아닌게, 어떤 파일이 통과되는지 여부는 간단하게나마 확인이 가능해야 하기 때문이다. 이 방법으로는 통과되는 파일들의 목록을 전혀 볼 수 없다.

<pre class="brush: bash; title: ; notranslate" title="">make &gt;/dev/null # 일반 메시지를 모두 갖다 버린다.
make --no-print-directory # 디렉토리 이동 (entering/leaving) 메시지를 보여주지 않는다.
make -s # .SLIENT에 모든 recipe가 정의된 것 처럼 작동시킨다..라고 이해했는데 맞는지 확인 바람
</pre>

이걸 대체하고 싶어서 나름 머리를 굴려서 이런 Rule을 덮어 썼다.

<pre class="brush: bash; title: ; notranslate" title="">COM_COLOR   = &#92;&#48;33[0;34m
OBJ_COLOR   = &#92;&#48;33[0;36m
OK_COLOR    = &#92;&#48;33[0;32m
ERROR_COLOR = &#92;&#48;33[0;31m
WARN_COLOR  = &#92;&#48;33[0;33m
NO_COLOR    = &#92;&#48;33[m

OK_STRING    = "[OK]"
ERROR_STRING = "[ERROR]"
WARN_STRING  = "[WARNING]"
COM_STRING   = "Compiling"

$(BUILD_DIR)/%$(OBJ_SUF): %.c
@$(Q) $(CC_TOOL) $(CC) $(COMP_FLAGS) $(CC_FLAGS) $(addprefix $(DEF_OPT),$(DEFINES)) $(addprefix $(INC_OPT),$(INCLUDES)) $(CC_OUT_OPT)$@ $&lt; 2&gt; $@.log; \
RESULT=$$?; \
if [ $$RESULT -ne 0 ]; then \
printf "         %b" "$(ERROR_COLOR)$(ERROR_STRING)"; \
elif [ -s $@.log ]; then \
printf "         %b" "$(WARN_COLOR)$(WARN_STRING)"; \
else  \
printf "         %b" "$(OK_COLOR)$(OK_STRING)"; \
fi; \
printf " %b" "$(COM_COLOR)$(COM_STRING)$(OBJ_COLOR) $(@F)$(NO_COLOR)\n"; \
cat $@.log;   \
rm -f $@.log; \
exit $$RESULT
</pre>

 [1]: https://www.gnu.org/software/make/manual/html_node/Echoing.html