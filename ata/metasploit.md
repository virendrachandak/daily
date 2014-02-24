metasploit魔鬼训练营
---
# 第一章：初始metasploit

## 开源渗透测试方法体系标准
1.  OSSTMM
2.  NIST SP 800-42
3.  **OWASP Top Ten**
4.  **WASC-TC**
5.  PTES
>   加粗的为与WEB开发比较密切的标准

## 安全漏洞公共资源库
1.  国内的资源库
    *   CNNVD(www.cnnvd.org.cn)
    *   CNVD(www.cnvd.org.cn)
    *   wooyun
    *   SCAP(http://www.scap.org.cn/)
2.  国外安全漏洞信息库
    *   CVE(Common Vulnerability and Exposure)
    *   NVD(National Vulnerability Database)
    *   Security Focus
    *   OSVDB(Open Source Vulnerability Database)
3.  安全社区
    *   [metasploit](http://www.metasploit.com/modules)
    *   [exploit-db](http://www.exploit-db.com)
    *   [packetStorm](http://packetstormsecurity.org)
    *   [securityFocus](http://www.securityfocus.com/bid)
    *   [securityReason](http://securityreason.com/exploit_alert/)
    *   [securityVulns](http://securityvulns.com/exploits/)
    *   [1337day](http://1337day.com)
    *   [CORE security](http://www.coresecurity.com)
    *   [VUPEN](http://www.vupen.com)

#   第二章：定V公司的网络环境拓扑
##  实验环境
    1.  渗透测试实验环境中的虚拟主机
        *   [Back Track 5](http://www.backtrack-linux.org)
        >   现在已经有新的发行版[Kali Linux](http://www.kali.org/)
        *   [OWASP BWA](http://code.google.com/p/owaspbwa/)
        *   [Win2K3 metasploitable](http://netsec.ccert.edu.cn/hacking/book/)
        *   [Linux Metasploitable](http://sourceforge.net/projects/metasploitable/)
        *   [WinXP Metasploitable](http://netsec.ccert.edu.cn/hacking/book/)
    2.  辅助分析工具
        *   wireshark
        *   IDA Pro
        *   OllyDbg
        *   Tamper Data & Hackbar

# 外围信息搜集
## 通过DNS和IP地址挖掘目标网络信息
1.  whois域名注册信息查询
2.  nslookup和dig域名查询
>   dig会从域名的官方DNS服务器上查询到精确的权威解答，nslookup只会得到DNS解析服务器保存在Cache中的非权威解答。

```
nslookup
> set type=A   
>   taobao.com  //通过设置type=A来对IP地址进行解析
>
>   set type=MX //通过设置type=MX来查找其邮件转发
>   taobao.com
>
>   ls -d example.com   //查看所有DNS记录
```

```
dig命令的基本使用方法：
dig @<DNS服务器> <待查询的域名>
```

3.  IP2Location地址位置查询
>   例如：GeoIP，在[http://www.maxmind.com](http://www.maxmind.com)上查询。
>
>   国内推荐使用“QQ纯真数据库”，网址为[http://www.cz88.net](http://www.cz88.net)

4.  netcraft网站提供的信息查询服务
>   枚举大型网站的子域名，地址[http://searchdns.netcraft.com/](http://searchdns.netcraft.com/)
>   还可以获得服务器地址，服务器操作系统，服务器运行状况等信息。

5.  IP2Domain反查域名
>   一台物理机器上可能有多台虚拟主机，可以通过反查域名信息获得有价值的信息。这些虚拟主机具有不同的域名，但通常公用一个IP地址。可以通过该台物理机器上其他网站的漏洞获取服务器权限从而与会获取渗透目标的>   全线，这样的攻击成为“旁注”。
>   可以使用[http://www.ip-address.com/reverse_ip/](http://www.ip-address.com/reverse_ip/)获取到哪些域名指向同一个IP地址。
>   国内的类似网站为：[http://www.7c.com](http://www.7c.com)

## 通过搜索引擎进行信息搜集
1.  google hacking
    *   Johnny Long的《Google Hacking for Penetration Testers》
    *   GHDB--[http://www.exploit-db.com/google-dorks](http://www.exploit-db.com/google-dorks)
    *   一些自动化帮助方便利用google及其他搜索引擎进行信息搜集的工具：SiteDigger和Search Diggity
    >   这两款工具只适用于windows
    *   [SiteDigger下载地址](http://www.mcafee.com/us/downloads/free-tools/sitedigger.aspx)
    >   siteDigger集成了FSDB（Foundstone Signature DataBase）
    *   [Search Diggity下载地址](http://www.stachliu.com)
2.  探索网站目录结构
    例如在google中输入`parent directory site:testfire.net`来查找`testfire.net`上的此类目录。
    >   `robots.txt`文件告诉了搜索引擎不能爬取的目录和文件。
    >   还可以使用metasploit的`brute_dirs`,`dir_listing`和`dir_scanner`等辅助模块来完成暴力猜解目录的工作。
3.  检索特定类型的文件
    例如`site:testfire.net filetype:xls`
4.  搜索网站中的email地址
    使用metasploit中的`search_email_collector`模块
5.  搜索易存在SQL注入点的页面
    例如`site:testfire.net inurl:login`
    >   例如：在用户名输入框输入`admin 'OR' 1`，在密码输入框输入`test 'OR' 1`。

## 活跃主机扫描
1.  ICMP Ping命令
2.  Metasploit主机发现模块
    >   metasploit中的辅助模块，位于metasploit源码路径的
    >   `modules/auxiliary/scanner/discovery/`目录下。主要有：`arp_sweep, ipv6_multicast_ping, ipv6_neighbor, ipv6_neighbor_router_advertisement, udp_probe, udp_sweep`等。其中最常用的两个模块的主要功能为：
    *   【arp_sweep】：使用ARP请求枚举本地局域网络中的所有活跃主机。
    *   【udp_sweep】：通过发送UDP数据包探查指定主机是否活跃，并发现主机上的UDP服务。
    >   DMZ网段、CIDR表示法，RHOSTS和THREADS参数。
3.  使用NMAP进行主机探测
    仅在内网中发现存活主机，可以使用`-sn`选项。这个选项会使用ICMMP的Ping扫描获取网络中的存活主机情况，而不会进一步探测主机的详细情况。
    如在Internet环境中，推荐使用`-Pn`选项，这样NMAP就不会使用Ping扫描。因为ICMP数据包无法穿透Internet上的网络边界（会被防火墙设备过滤），其功能类似于metasploit中的`udp_sweep`辅助模块。NMAP在进行UDP主机探测时，会默认列出开放的TCP端口。

### 操作系统辨识
    在NMAP中使用`-O`选项对目标操作系统进行识别。
    >   因为metasploit的攻击载荷针对不同的操作系统。
    >   使用`nmap -A`可以获取更详细的服务和操作系统信息。

### 端口扫描与服务类型探测
    目前常见的端口扫描技术一般有以下几类：`TCP Connect, TCP SYN, TCP ACK, TCP FIN`。
    >   TCP Connect需要扫描器发起一次真实的TCP连接，连接成功则表明端口是开放的。这种结果最精确，但是速度最慢，而且会在被扫描目标主机上留下记录，容易暴露扫描。
    >   而SYN、ACK、FIN等则是利用了TCP协议栈的一些特征，更加快速和隐蔽。
    1.  metasploit中的端口扫描器
        输入命令`search portscan`查找相关的端口扫描器
        *   ack:ACK扫描防火墙未屏蔽的端口；
        *   ftpbounce：通过FTP bounce攻击原理枚举TCP服务。一些新的FTP服务器软件能够很好的防范，但是一些旧的Solaris和FreeBSD系统的FTP服务仍然会中招。
        *   syn：发送TCP SYN标识探测开放端口。
        *   tcp：实际的TCP连接来进行判断。最精准，但是速度慢。
        *   xmas：通过发送FIN、PSH和URG标识探测，能躲避一些高级TCP标记检测器的过滤。
        >   一般推荐使用syn端口扫描器。
    2.  Nmap的端口扫描功能
        大部分扫描器将端口分为open（开放）或closed（关闭）两种类型。NMAP将端口状态细分为：open（开放）、closed（关闭）、filtered（过滤）、unfiltered（未过滤）、open|filtered（被过滤）、closed|filtered（关闭或被过滤）六个状态。
        *   open：有应用程序在监听，并接受来自TCP、UDP或SCTP的数据。
        *   closed：主机已响应，但没有应用在监听。
        *   filtered：不能确认端口是否开放，但根据响应数据猜测该端口可能被防火墙等设备过滤。
        *   unfiltered：仅在使用ACK扫描，且NMAP无法确定端口是否开发时归于此类。可使用其他类型扫描（如window扫描、SYN扫描、FIN扫描）进一步确认。
        NMAP参数分为扫描类型参数（指定扫描发现机制）和扫描选项参数（指定扫描时的具体动作）。
        常见NMAP扫描类型参数主要有：
        *   `-sT`:TCP connect扫描，类似metasploit中的tcp扫描模块。
        *   `-sS`:TCP SYN扫描，类似metasploit中的syn扫描模块。
        *   `-sF/-sX/sN`:通过发送特殊标志位避开设备或软件监测。
        *   `-sP`:通过发送ICMP echo请求探测主机是否存活，原理同ping。
        *   `-sU`:探测目标主机开放的UDP端口。
        *   `-sA`:TCP ACK扫描，类似metasploit中的ack扫描模块。
        常见NMAP扫描选项有：
        *   `-Pn`:在扫描前不发送ICMP echo请求探测目标是否活跃。
        *   `-O`:启用对于TCP/IP协议栈的指纹特征扫描以获取远程主机的操作系统类型等信息。
        *   `-F`:快速扫描模式，只扫描在`nmap-services`中列出的端口。
        *   `-p<端口范围>`:指定希望扫描的端口，可以使用一段端口范围（1~1023）。在IP协议扫描中（使用`-sO`参数），可以指定想要扫描的协议号(0~255)。
#   第四章：WEB应用渗透技术
## 
