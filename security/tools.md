### vulnerability databases
1.  [CNNVD](http://www.cnnvd.org.cn)
2.  [CNVD](http://www.cnvd.org.cn)
3.  [wooyun](http://www.wooyun.org)
4.  [SCAP](http://www.scap.org.cn)
5.  CVE--Common Vulnerability and Exposures
6.  NVD--National Vulnerability Database
7.  SecurityFocus
8.  OSVDB--Open Source Vulnerability Database
9.  [metasploit](www.metasploit.com/modules)
10. [Exploit-db](www.exploit-db.com)
11. [PacketStorm](packetstormsecurity.org)
12. [SecurityFocus](www.securityfocus.com/bid)
13. [SecurityReason](securityreason.com/exploit_alert/)
14. [SecurityVulns](securityvluns.com/exploits)
15. [1337Day](1337day.com)
16. [CORE Security](www.coresecurity.com)
17. [VUPEN](www.vupen.com)

### metasploit
1.  windows安装
    *   msfconsole控制台终端
    *   msfcli命令行程序`msfcli -h`
2.  miscellaneous
    *   author: HD Moore and Open Source Community
    *   SecTools
    *   OSSTMM, NIST SP800-42, OWASP Top 10, WASC-TC和PTES等渗透测试方法学。

### 模拟渗透实验环境的虚拟机
1.  [Back Track](http://www.backtrack-linux.org/)
>   linux攻击机

2.  [OWASP BWA](http://code.google.com/p/owaspbwa/)
>   WEB服务器靶机

3.  [Win2K3 Meetasploitable](http://netsec.ccert.edu.cn/hacking/book/)
4.  [Linux Metasploitable](http://sourceforge.net/projects/metasploitable)
5.  [WinXP Metasploitable](http://netsec.ccert.edu.cn/hacking/book/)
6.  miscellaneous
    *   DMZ区
    *   门户网站服务器[www.dvssc.com](www.dvssc.com)
    >   IP:10.10.10.129
    *   服务器[service.dvssc.com](service.dvssc.com)
    >   IP:10.10.10.130
    *   Linux Metasploitable虚拟机链接DMZ区和企业内网的网管服务器[gate.dvss.com](gate.dvss.com)
    >   IP:10.10.10.254
    *   连接企业内网的网络接口IP地址：192.168.10.254
7.  Window渗透测试
DEP(内存执行保护)，ASLR(内存地址空间随机化)保护机制的绕过方法ROP(Return Oriented Programming，返回导向编程)以及Heap Spray(堆喷射)

### 环境分析
1.  辅助分析工具
    *   wireshark:BT5
    *   IDA Pro:Win2K3/WinXP Metasploitable
    *   OllyDbg:Win2K3/WinXP Metasploitable
    *   Tamper Data & Hackbar
2.  linux网络配置
*   修改linux网卡配置
>   `sudo vi /etc/network/interfaces`
>   重启网卡命令：`sudo /etc/init.d/networking restart`

*  配置路由功能
>   `sudo vi /etc/sysctl.conf`
