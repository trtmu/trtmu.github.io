### Linux

#### 常用指令
#### 阿里云服务器相关
- 云服务器 ip 47.94.254.119
    - linux用户 root/1111  123/123
- 云数据库 ip 59.110.205.98 
    - 用户名 root/Liu844700
    - 远程连接云数据库:
        mysql -pmysql -h59.110.205.98 -P3306 -uroot1 -p1111
        mysql -pmysql -h59.110.205.98 -P3306 -uroot -pLiu844700
- vsftp服务器用户  vsftpd/1111
    
查看8080端口是否占用 netstat -anp|grep 8080  
杀死进程 kill -9  pid  
实时查看tomcat运行日志 tail -f catalina.out  
以服务方式启动tomcat nohup ./startup.sh &  
nginx服务实现停止、启动、重启的动作如下：  
systemctl stop  nginx.service  
systemctl start  nginx.service  
systemctl restart nginx.service  
检查服务状态  
systemctl status nginx.service  
使服务开机启动  
systemctl enable nginx.service  
取消服务开机启动  
systemctl disable nginx.service  
    









linux常用命令
一、文件处理命令

cd /home 进入 ‘/ home’ 目录’ 
cd .. 返回上一级目录 
cd ../.. 返回上两级目录 
cd 进入个人的主目录 
cd ~user1 进入个人的主目录 
cd - 返回上次所在的目录 

pwd 显示工作路径 

ls 查看目录中的文件 
ls -F 查看目录中的文件 
ls -l 显示文件和目录的详细资料 
ls -a 显示隐藏文件 
ls [0-9] 显示包含数字的文件名和目录名 

tree 显示文件和目录由根目录开始的树形结构(1) 
lstree 显示文件和目录由根目录开始的树形结构(2) 

mkdir dir1 创建一个叫做 ‘dir1’ 的目录’ 
mkdir dir1 dir2 同时创建两个目录 
mkdir -p /tmp/dir1/dir2 创建一个目录树 

rm -f file1 删除一个叫做 ‘file1’ 的文件’ 
rmdir dir1 删除一个叫做 ‘dir1’ 的目录’ 
rm -rf dir1 删除一个叫做 ‘dir1’ 的目录并同时删除其内容 
rm -rf dir1 dir2 同时删除两个目录及它们的内容 
mv dir1 new_dir 重命名/移动 一个目录 

cp file1 file2 复制一个文件 
cp dir/* . 复制一个目录下的所有文件到当前工作目录 
cp -a /tmp/dir1 . 复制一个目录到当前工作目录 
cp -a dir1 dir2 复制一个目录 

ln -s file1 lnk1 创建一个指向文件或目录的软链接 
ln file1 lnk1 创建一个指向文件或目录的物理链接 
touch -t 0712250000 file1 修改一个文件或目录的时间戳 - (YYMMDDhhmm) 
file file1 outputs the mime type of the file as text 
iconv -l 列出已知的编码 
    
二、权限管理命令

用户组
在linux中的每个用户必须属于一个组，不能独立于组外。在linux中每个文件有所有者、所在组、其它组的概念
【所有者】
一般为文件的创建者，谁创建了该文件，就天然的成为该文件的所有者
用ls ‐ahl命令可以看到文件的所有者
也可以使用chown用户名 文件名 来修改文件的所有者
【文件所在组】
当某个用户创建了一个文件后，这个文件的所在组就是该用户所在的组
用ls ‐ahl命令可以看到文件的所有组
也可以使用chgrp 组名 文件名来修改文件所在的组
【其它组】
除开文件的所有者和所在组的用户外，系统的其它用户都是文件的其它组
【文件权限】
ls -l中显示的内容如下：
-rwxrw-r‐-1 root root 1213 Feb 2 09:39 abc
10个字符确定不同用户能对文件干什么
第一个字符代表文件（-）、目录（d），链接（l）
其余字符每3个一组（rwx），读（r）、写（w）、执行（x）
第一组rwx：文件所有者的权限是读、写和执行
第二组rw-：与文件所有者同一组的用户的权限是读、写但不能执行
第三组r--：不与文件所有者同组的其他用户的权限是读不能写和执行
也可用数字表示为：r=4，w=2，x=1  因此rwx=4+2+1=7
1 表示连接的文件数
 root 表示用户
 root表示用户所在的组
 1213 表示文件大小（字节）
 Feb 2 09:39 表示最后修改日期
-abc表示文件名
改变权限的命令
chmod改变文件或目录的权限
chmod 755 abc：赋予abc权限rwxr-xr-x
chmod u=rwx，g=rx，o=rx abc：同上u=用户权限，g=组权限，o=不同组其他用户权限
chmod u-x，g+w abc：给abc去除用户执行的权限，增加组写的权限
chmod a+r abc：给所有用户添加读的权限
改变所有者（chown）和用户组（chgrp）命令
chown xiaoming abc：改变abc的所有者为xiaoming
chgrp root abc：改变abc所属的组为root
chown root ./abc：改变abc这个目录的所有者是root
chown ‐R root ./abc：改变abc这个目录及其下面所有的文件和目录的所有者是root
【改变用户所在组】
在添加用户时，可以指定将该用户添加到哪个组中，同样用root的管理权限可以改变某个用户所在的组
usermod ‐g 组名 用户名
你可以用
usermod ‐d 目录名 用户名，改变该用户登录的初始目录
【综合案例】
【题1.1】建立两个用户组group1和group2，以及三个用户dennis、daniel、abigale，并且将前2个用户分配在group1用户组下，后一个分配在group2用户组下
【题1.2】以dennis用户登录，创建一个Hello.java文件
【题1.3】以daniel用户登录，观察是否可以访问/home/dennis目录以及读或写其创建的Hello.java文件
【题1.4】以dennis用户登录，修改目录/home/dennis及Hello.java文件的读写权限（更正：修改目录权限的时候，应该使用770，而不是760，否则权限不足）
【题1.5】重复【题1.3】
【题1.6】改变abigale的用户组由group2变为group1
然后，可以使用cat /etc/passwd查看并确定

三、帮助命令
    type cd    遇到陌生命令可以看到系统给出的解释

    ls –help    查看命令所支持的参数说明

    help ls     获得 ls 命令的帮助文档

    man cd    查看某命令的正式文档

    which cd  查看cd命令的所在位置
四、文件搜索命令
    find / -name file1 从 ‘/’ 开始进入根文件系统搜索文件和目录 

    find / -user user1 搜索属于用户 ‘user1’ 的文件和目录 

    find /home/user1 -name *.bin 在目录 ‘/ home/user1’ 中搜索带有’.bin’ 结尾的文件 

    find /usr/bin -type f -atime +100 搜索在过去100天内未被使用过的执行文件 

    find /usr/bin -type f -mtime -10 搜索在10天内被创建或者修改过的文件 

    find / -name *.rpm -exec chmod 755 ‘{}’ \; 搜索以 ‘.rpm’ 结尾的文件并定义其权限 

    find / -xdev -name *.rpm 搜索以 ‘.rpm’ 结尾的文件，忽略光驱、捷盘等可移动设备 

    locate *.ps 寻找以 ‘.ps’ 结尾的文件 - 先运行 ‘updatedb’ 命令 

    whereis halt 显示一个二进制文件、源码或man的位置 

    which halt 显示一个二进制文件或可执行文件的完整路径 

五、压缩解压命令

六、命令使用技巧
    date 显示系统日期
arch 显示机器的处理器架构(1) 
uname -m 显示机器的处理器架构(2) 
uname -r 显示正在使用的内核版本 
dmidecode -q 显示硬件系统部件 - (SMBIOS / DMI) 
hdparm -i /dev/hda 罗列一个磁盘的架构特性 
hdparm -tT /dev/sda 在磁盘上执行测试性读取操作 
cat /proc/cpuinfo 显示CPU info的信息 
cat /proc/interrupts 显示中断 
cat /proc/meminfo 校验内存使用 
cat /proc/swaps 显示哪些swap被使用 
cat /proc/version 显示内核的版本 
cat /proc/net/dev 显示网络适配器及统计 
cat /proc/mounts 显示已加载的文件系统 
lspci -tv 罗列 PCI 设备 
lsusb -tv 显示 USB 设备 

cal 2007 显示2007年的日历表 
date 041217002007.00 设置日期和时间 - 月日时分年.秒 
clock -w 将时间修改保存到 BIOS 
关机 (系统的关机、重启以及登出 ) 
shutdown -h now 关闭系统(1) 
init 0 关闭系统(2) 
telinit 0 关闭系统(3) 
shutdown -h hours:minutes & 按预定时间关闭系统 
shutdown -c 取消按预定时间关闭系统 
shutdown -r now 重启(1) 
reboot 重启(2) 
logout 注销 
    

七、VIM使⽤
    【vi的模式】
 命令模式：vi启动默认进入的模式，可进入输入模"i"，或末行模式（:），除了可以完成命令的功能外，也是后两种模式的转换点
 输入模式：即文本辑辑状态，最后一行显示"-- INSERT --"提示，按ESC返回到命令模式
 末行模式：可完成一些复杂操作，以":"开始，执行完一个末行命令后自动返回命令模式
【基本使用】
1.vi 编辑器的启动与退出：
 (1).使用命令"vi"直接进入编辑环境
 (2).在命令模式下输入":q!"，可以强行退出编辑环境，对文件修改不进行保存
 (3).以文件名作为"vi"命令的参数时，若存在此文件，则vi可对内容进行编辑，若不存在，打开以参数名命名的空文件

 2.文件操作：

 (1).打开新文件：在末行模式下":e filename"关闭当前文件并打开新文件，":e! filename 强制关闭当前文件并打开新文件"
 (2).读取文件内容到当前文件：":r filename"，读取的文件内容粘贴到当前文件光标所在行的下面
 (3)保存文件：命令为":w [filename]"，如果文件已经命名，可直接使用":w"命令的参数，如果没有命名，第一次保存时需指定文件名作为参数
 (4).另存为文件：命令为":w filename"，只保存到新文件，而不更新原来文件的内容
 (5).退出vi编辑器：退出格式为":q"，保存并退出为":wq"，强行退出为":q!"
 
 3.光标的移动操作(命令模式下)

 (1).光标方向移动："h"左、"l"右、"k"上、"j"下
 (2).翻页移动："ctrl+f"前一页、"ctrl+b"后一页、"ctrl+u"前半页、"ctrl+d"后半页
 (3).行内快速跳转："^"本行首字符、"$"本行尾字符、"w"后一单词首字母、"b"前一单词首字母、"e"后一单词尾字母；可添加数字组合使用，例如："3w"后三个单词首字母、"4b"前4个单词首字母、"5e"后5个单词尾字母
 (4).文件内行间跳转：显示行号":set nu"，取消显示行号":set nonu"，"1G"跳转到首行，"G"跳转到末尾行，"#G"跳转到第#行
 
 4.编辑操作

 (1).进行输入模式："i"当前光标处，"a"当前光标后，"A"当前行末，"o"当前行下插入新行，"O"当前行上插入新行，"cw"删除当前光标到所在尾部字符，
   "c$"删除当前光标到行尾的字符，"c^"删除当前光标(不包括)之前到行首的字符；以上记忆如有困难，可只记"i"从命令模式进入输入模式，完成编辑后"Esc"退回到命令模式
 (2).输入模式的操作：上下左右方向进行光标移动，"Home/End"定位光标到行首行尾，"Page Up /Down"上下翻页，"Backspace"左侧字符的删除，"Delete"删除光标位置的字符
 (3).删除操作：在命令模式下，可用以下命令完成删除操作，"x"光标处单个字符，"dd"光标所在行，"dw"当前字符到单词尾（含空格），"de"当前字符到单词尾（不含空格），
     "d$"当前字符到行尾，"d^"当前字符到行首，"J"合并当前行与下一行的内容，可添加数字配合使用，例如"3x"当前光标向右3个字符，"2dd"从当前行开始向下两行文本，
     "3dw"当前光标向右3个单词，"2de"当前光标向右两个单词（保留一个空格），"5J"合并5行文本
 (4).撤销操作：在命令模式下，"u"取消最近一次操作，可重复使用，"U"取消对当前行进行的所有操作，"Ctrl+R"对"u"产生的撤消进行恢复
 (5).复制操作："yy"整行，"yw"光标到单词尾，"y$"光标到行尾，"y^"光标到行首；与数字组合使用，"5yy"当前及后续共5行，"3yw"当前光标开始的3个单词；
末行命令":m,ny"m行到n行之间的文本，例如：":100,200y"100行到200的内容
 (6).粘贴操作：在命令模式下，使用"p"将缓冲区中的内容粘贴到当前文档

 5.查找与替换操作(末行模式)

 (1).自上而下：":/word"查找指定的字符串，"n"查找下一个（自上而下）"N"反向查找下一个（自下而上）
 (2).自下而上：":?word"自下而上查找指定字符串，"n"查找下一个（自下而上）"N"反向查找下一个（自上而下）
 (3).普通替换：":s/old/new"由s开始，"old"指被替换的字符串，"new"替换成哪个字符串，此命令只替换当前行中第一个匹配的字符串
 (4).行内全部替换：":s/old/new/g"，当前行内所有匹配的字符串
 (5).在行区域内进行替换：":#,#s/old/new/g"，"#,#"表示两个行号之间的行区域，例如"3,5"表示第3行到第5行
 (6).整个文件内的替换操作：":%s/old/new/g"，加%表示整篇文档，危险，慎用
 (7).使用替换确认功能：在原替换命令后加"c"可提供确认功能，例如：":s/old/new/c"，":s/old/new/gc"，":#,#s/old/new/gc"，":%s/old/new/gc"；
替换命令确认后的提示为"replace with word (y/n/a/q/l/^E/^Y) ?"，其中"y"替换，"n"放弃，"a"所有，"q"退出

八、软件包管理
rpm -ivh package.rpm 安装一个rpm包 
rpm -ivh –nodeeps package.rpm 安装一个rpm包而忽略依赖关系警告 
rpm -U package.rpm 更新一个rpm包但不改变其配置文件 
rpm -F package.rpm 更新一个确定已经安装的rpm包 
rpm -e package_name.rpm 删除一个rpm包 
rpm -qa 显示系统中所有已经安装的rpm包 
rpm -qa | grep httpd 显示所有名称中包含 “httpd” 字样的rpm包 
rpm -qi package_name 获取一个已安装包的特殊信息 
rpm -qg “System Environment/Daemons” 显示一个组件的rpm包 
rpm -ql package_name 显示一个已经安装的rpm包提供的文件列表 
rpm -qc package_name 显示一个已经安装的rpm包提供的配置文件列表 
rpm -q package_name –whatrequires 显示与一个rpm包存在依赖关系的列表 
rpm -q package_name –whatprovides 显示一个rpm包所占的体积 
rpm -q package_name –scripts 显示在安装/删除期间所执行的脚本l 
rpm -q package_name –changelog 显示一个rpm包的修改历史 
rpm -qf /etc/httpd/conf/httpd.conf 确认所给的文件由哪个rpm包所提供 
rpm -qp package.rpm -l 显示由一个尚未安装的rpm包提供的文件列表 
rpm –import /media/cdrom/RPM-GPG-KEY 导入公钥数字证书 
rpm –checksig package.rpm 确认一个rpm包的完整性 
rpm -qa gpg-pubkey 确认已安装的所有rpm包的完整性 
rpm -V package_name 检查文件尺寸、 许可、类型、所有者、群组、MD5检查以及最后修改时间 
rpm -Va 检查系统中所有已安装的rpm包- 小心使用 
rpm -Vp package.rpm 确认一个rpm包还未安装 
rpm2cpio package.rpm | cpio –extract –make-directories bin 从一个rpm包运行可执行文件 
rpm -ivh /usr/src/redhat/RPMS/arch/package.rpm 从一个rpm源码安装一个构建好的包 
rpmbuild –rebuild package_name.src.rpm 从一个rpm源码构建一个 rpm 包 

九、⽤户和⽤户组管理
groupadd group_name 创建一个新用户组 

groupdel group_name 删除一个用户组 

groupmod -n new_group_name old_group_name 重命名一个用户组 

useradd -c “Name Surname ” -g admin -d /home/user1 -s /bin/bash user1 创建一个属于 “admin” 用户组的用户 

useradd -g groupname  user1 创建一个新用户 

userdel -r user1 删除一个用户 ( ‘-r’ 排除主目录) 

usermod -c “User FTP” -g system -d /ftp/user1 -s /bin/nologin user1 修改用户属性 

passwd 修改口令 

passwd user1 修改一个用户的口令 (只允许root执行) 

chage -E 2005-12-31 user1 设置用户口令的失效期限 

pwck 检查 ‘/etc/passwd’ 的文件格式和语法修正以及存在的用户 

grpck 检查 ‘/etc/passwd’ 的文件格式和语法修正以及存在的群组 

newgrp group_name 登陆进一个新的群组以改变新创建文件的预设群组 

十、服务和进程

     ps     查看进程
 kill   进程号   杀死指定进程
systemctl命令：
语法：systemctl [OPTIONS…] COMMAND [SERVICE_NAME.service…]
<1>启动：service SERVICE_NAME start ==>systemctl start SERVICE_NAME.service
<2>停止：service SERVICE_NAME stop ==>systemctl stop SERVICE_NAME.service
<3>重启：service SERVICE_NAME restart ==> systemctl restart SERVICE_NAME.service
<4>状态：service SERVICE_NAME status ==> systemctl status SERVICE_NAME.service

十一、基本⽹络设置
    ifconfig
    echo $PATH
    用find命令也没找到ifconfig
    find / -name "ifconfig"
    linux已经用ip命令代替ifconfig命令，
        用yum install net-tools安装net-tools组件，将ifconfig命令找回来
    
    打印网络配置信息
    cat /etc/sysconfig/network-scripts/ifcfg-enp3s0
    
    启动和关闭网卡命令
    ifup、ifdown
    
    重启网络服务
    /etc/init.d/network restart 
    和
    service network restart

ip  [选项]  操作对象{link|addr|route...}

# ip link show  # 显示网络接口信息
# ip link set eth0 upi           # 开启网卡
# ip link set eth0 down          # 关闭网卡
# ip link set eth0 promisc on      # 开启网卡的混合模式
# ip link set eth0 promisc offi     # 关闭网卡的混个模式
# ip link set eth0 txqueuelen 1200   # 设置网卡队列长度
# ip link set eth0 mtu 1400        # 设置网卡最大传输单元
# ip addr show                # 显示网卡IP信息
# ip addr add 192.168.0.1/24 dev eth0 # 设置eth0网卡IP地址192.168.0.1
# ip addr del 192.168.0.1/24 dev eth0 # 删除eth0网卡IP地址

# ip route list                 # 查看路由信息
# ip route add 192.168.4.0/24  via  192.168.0.254 dev eth0 # 设置192.168.4.0网段的网关为192.168.0.254,数据走eth0接口
# ip route add default via  192.168.0.254  dev eth0    # 设置默认网关为192.168.0.254
# ip route del 192.168.4.0/24      # 删除192.168.4.0网段的网关
# ip route del default          # 删除默认路由

VirtualBox的提供了四种网络接入模式，它们分别是： 
1、NAT 网络地址转换模式(NAT,Network Address Translation) 
2、Bridged Adapter 桥接模式 
3、Internal 内部网络模式 
4、Host-only Adapter 主机模式 

第一种 NAT模式 
解释： 
NAT模式是最简单的实现虚拟机上网的方式，你可以这样理解：Vhost访问网络的所有数据都是由主机提供的，vhost并不真实存在于网络中，主机与网络中的任何机器都不能查看和访问到Vhost的存在。 
虚拟机与主机关系： 
只能单向访问，虚拟机可以通过网络访问到主机，主机无法通过网络访问到虚拟机。 
虚拟机与网络中其他主机的关系： 
只能单向访问，虚拟机可以访问到网络中其他主机，其他主机不能通过网络访问到虚拟机。 
虚拟机与虚拟机之间的关系： 
相互不能访问，虚拟机与虚拟机各自完全独立，相互间无法通过网络访问彼此。 
IP:10.0.2.15 
网关：10.0.2.2 
DNS：10.0.2.3 
一台虚拟机的多个网卡可以被设定使用 NAT， 第一个网卡连接了到专用网 10.0.2.0，第二个网卡连接到专用网络 10.0.3.0，等等。默认得到的客户端ip（IP Address）是10.0.2.15，网关（Gateway）是10.0.2.2，域名服务器（DNS）是10.0.2.3，可以手动参考这个进行修改。 
NAT方案优缺点： 
笔记本已插网线时： 虚拟机可以访问主机，虚拟机可以访问互联网，在做了端口映射后（最后有说明），主机可以访问虚拟机上的服务（如数据库）。 
笔记本没插网线时： 主机的“本地连接”有红叉的，虚拟机可以访问主机，虚拟机不可以访问互联网，在做了端口映射后，主机可以访问虚拟机上的服务（如数据库）。 

第二种 Bridged Adapter模式 
解释： 
网桥模式是我最喜欢的用的一种模式，同时，模拟度也是相当完美。你可以这样理解，它是通过主机网卡，架设了一条桥，直接连入到网络中了。因此，它使得虚拟机能被分配到一个网络中独立的IP，所有网络功能完全和在网络中的真实机器一样。 
虚拟机与主机关系： 
可以相互访问，因为虚拟机在真实网络段中有独立IP，主机与虚拟机处于同一网络段中，彼此可以通过各自IP相互访问。 
虚拟机于网络中其他主机关系： 
可以相互访问，同样因为虚拟机在真实网络段中有独立IP，虚拟机与所有网络其他主机处于同一网络段中，彼此可以通过各自IP相互访问。 
虚拟机于虚拟机关系： 
可以相互访问，原因同上。 
IP：一般是DHCP分配的，与主机的“本地连接”的IP 是同一网段的。虚拟机就能与主机互相通信。 
笔记本已插网线时：（若网络中有DHCP服务器）主机与虚拟机会通过DHCP分别得到一个IP，这两个IP在同一网段。 主机与虚拟机可以ping通，虚拟机可以上互联网。 
笔记本没插网线时：主机与虚拟机不能通信。主机的“本地连接”有红叉，就不能手工指定IP。虚拟机也不能通过DHCP得到IP地址，手工指定IP后，也无法与主机通信，因为主机无IP。 
这时主机的VirtualBox Host-Only Network 网卡是有ip的，192.168.56.1。虚拟机就算手工指定了IP 192.168.56.*，也ping不能主机。 

第三种 Internal模式 
解释： 
内网模式，顾名思义就是内部网络模式，虚拟机与外网完全断开，只实现虚拟机于虚拟机之间的内部网络模式。 
虚拟机与主机关系： 
不能相互访问，彼此不属于同一个网络，无法相互访问。 
虚拟机与网络中其他主机关系： 
不能相互访问，理由同上。 
虚拟机与虚拟机关系： 
可以相互访问，前提是在设置网络时，两台虚拟机设置同一网络名称。如上配置图中，名称为intnet。 
IP: VirtualBox的DHCP服务器会为它分配IP ，一般得到的是192.168.56.101，因为是从101起分的，也可手工指定192.168.56.*。 
笔记本已插网线时：虚拟机可以与主机的VirtualBox Host-Only Network 网卡通信 
这种方案不受主机本地连接（网卡）是否有红叉的影响。 

第四种 Host-only Adapter模式 
解释： 
主机模式，这是一种比较复杂的模式，需要有比较扎实的网络基础知识才能玩转。可以说前面几种模式所实现的功能，在这种模式下，通过虚拟机及网卡的设置都可以被实现。 
我们可以理解为Vbox在主机中模拟出一张专供虚拟机使用的网卡，所有虚拟机都是连接到该网卡上的，我们可以通过设置这张网卡来实现上网及其他很多功能，比如（网卡共享、网卡桥接等）。 
虚拟机与主机关系 
默认不能相互访问，双方不属于同一IP段，host-only网卡默认IP段为192.168.56.X 子网掩码为255.255.255.0，后面的虚拟机被分配到的也都是这个网段。通过网卡共享、网卡桥接等，可以实现虚拟机于主机相互访问。 
虚拟机与网络主机关系 
默认不能相互访问，原因同上，通过设置，可以实现相互访问。 
虚拟机与虚拟机关系 
默认可以相互访问，都是同处于一个网段。 
虚拟机访问主机 用的是主机的VirtualBox Host-Only Network网卡的IP：192.168.56.1 ，不管主机“本地连接”有无红叉，永远通。 
主机访问虚拟机，用是的虚拟机的网卡3的IP： 192.168.56.101 ，不管主机“本地连接”有无红叉，永远通。 
虚拟机访问互联网，用的是自己的网卡2， 这时主机要能通过“本地连接”有线上网，（无线网卡不行） 

通过对以上几种网络模式的了解，我们就可以灵活运用，模拟组建出我们所想要的任何一种网络环境了。 
比如我想模拟出来一个一台主机，监控一个局域网上网情况的网络环境。 
首先我开启了两台虚拟机vhost1与vhost2，当然如果硬件允许，我同样可以再增加vhost3、vhost4… 
所有的vhost我都设置成internat内网模式，网络名称为intnal，网关为192.168.56.100，意思就是通过 192.168.56.100网卡上网。其中有一台vhost1我设置为双网卡，一张为内网模式（192.168.56.100），一张为网桥模式（192.168.1.101）。两张网卡设置双网卡共享上网 
虚拟机之间为局域网，其中有一台虚拟机vhost1通过与外网相连，所有局域网中的虚拟机又通过vhost1来实现上外网。这样vhost1就可以监控整个虚拟机局域网上网情况了。 

NAT 设置端口映射 
http://huzhangsheng. 
你可以设置一个虚拟机的服务（比如 WEB 服务），通过使用命令行工具 VboxManage 代理。你需要知道虚拟机的服务使用哪个端口，然后决定在主机上使用哪个端口（通常但不总是想要使虚拟机和主机使用同一个端口）。在主机上提供一个服务需要使用一个端口，你能使用在主机上没有准备用来提供服务的任何端口。一个怎样设置新的 NAT 例子，在虚拟机上连接到一个 ssh 服务器，需要下面的三个命令： 
VBoxManage setextradata 'Linux Guest' 'VBoxInternal/Devices/pcnet/0/LUN#0/Config/guestssh/Protocol' TCP 
VBoxManage setextradata 'Linux Guest' 'VBoxInternal/Devices/pcnet/0/LUN#0/Config/guestssh/GuestPort' 22 
VBoxManage setextradata 'Linux Guest' 'VBoxInternal/Devices/pcnet/0/LUN#0/Config/guestssh/HostPort' 2222 
说明：VboxManage 是一个命令行程序，请查询你的 VirtualBox 安装目录，'Linux Guest' 是虚拟主机名。guestssh 是一个自定义的名称，你可以任意设置，通过上面的三个命令，把虚拟机的 22 端口 转发到主机的 2222 端口。 
又比如，我在虚拟机 debian 上安装了 apache2 服务器，使用 80 端口，映射到主机的 80 端口。使用下面的命令。 
'C:\Program Files\innotek VirtualBox\VBoxManage.exe' setextradata 'debian' 'VBoxInternal/Devices/pcnet/0/LUN#0/Config/huzhangsheng/Protocol' TCP 
'C:\Program Files\innotek VirtualBox\VBoxManage.exe' setextradata 'debian' 'VBoxInternal/Devices/pcnet/0/LUN#0/Config/huzhangsheng/GuestPort' 80 
'C:\Program Files\innotek VirtualBox\VBoxManage.exe' setextradata 'debian' 'VBoxInternal/Devices/pcnet/0/LUN#0/Config/huzhangsheng/HostPort' 80 
注意：要使设置生效，请关掉 VirtualBox 再运行虚拟机，我把 VirtualBox 安装在 winxp 上，在虚拟机中安装 debian 4.02r ，虚拟机名是 debian ，并安装了 apache2 php5 mysql-server ，在主机上用IE浏览 http://localhost，成功转发到虚拟机 debian 的 apache2 web 服务器上 


