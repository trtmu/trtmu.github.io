@echo 开始提交代码到本地仓库
@echo 当前目录是：%cd%
@git add -A . 
@set /p declation=输入修改记录: 
@git commit -m "%declation%" 
@git push 
echo 执行完成
pause
