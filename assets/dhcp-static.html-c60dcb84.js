import{_ as s,W as n,X as a,a2 as e}from"./framework-3c1374b9.js";const p={},t=e(`<h1 id="如何将物理服务器动态ip转为静态ip" tabindex="-1"><a class="header-anchor" href="#如何将物理服务器动态ip转为静态ip" aria-hidden="true">#</a> 如何将物理服务器动态IP转为静态IP</h1><p>自己的服务器在家里，每次开机都会分配一个新的IP，这样就很不方便，所以想将动态IP转为静态IP，这样就可以通过固定IP来访问了。</p><h2 id="先确定网卡名称" tabindex="-1"><a class="header-anchor" href="#先确定网卡名称" aria-hidden="true">#</a> 先确定网卡名称</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ifconfig</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果命令不可用可以使用命令<code>ip addr</code>如果还不行就先安装包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cdn.jsdelivr.net/gh/0xAiKang/CDN/blog/images/2021/20210909162200.png" alt="ifconfig" tabindex="0" loading="lazy"><figcaption>ifconfig</figcaption></figure><p>根据你上方的命令查看网卡名称，</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/sysconfig/network-scripts/ifcfg-em1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我的动态IP是192.168.50.238，所以我是em1</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>em1: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">192.168</span>.50.238  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">192.168</span>.50.255
        inet6 fe80::81e:8807:f229:bb59  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether ec:f4:bb:ec:ea:88  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">35058</span>  bytes <span class="token number">32959726</span> <span class="token punctuation">(</span><span class="token number">31.4</span> MiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">9761</span>  bytes <span class="token number">676024</span> <span class="token punctuation">(</span><span class="token number">660.1</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

em2: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">409</span><span class="token operator"><span class="token file-descriptor important">9</span>&lt;</span>UP,BROADCAST,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        ether ec:f4:bb:ec:ea:8a  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>

lo: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">7</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,LOOPBACK,RUNNING<span class="token operator">&gt;</span>  mtu <span class="token number">65536</span>
        inet <span class="token number">127.0</span>.0.1  netmask <span class="token number">255.0</span>.0.0
        inet6 ::1  prefixlen <span class="token number">128</span>  scopeid 0x1<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>host<span class="token operator">&gt;</span>
        loop  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Local Loopback<span class="token punctuation">)</span>
        RX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">0</span>  bytes <span class="token number">0</span> <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看网卡默认配置" tabindex="-1"><a class="header-anchor" href="#查看网卡默认配置" aria-hidden="true">#</a> 查看网卡默认配置</h2><p>以下是我的默认配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">TYPE</span><span class="token operator">=</span><span class="token string">&quot;Ethernet&quot;</span>
<span class="token assign-left variable">PROXY_METHOD</span><span class="token operator">=</span><span class="token string">&quot;none&quot;</span>
<span class="token assign-left variable">BROWSER_ONLY</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span><span class="token string">&quot;dhcp&quot;</span> <span class="token comment">#dhcp改为static</span>
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token number">192.168</span>.50.106 <span class="token comment">#改为你想要的真实静态IP</span>
<span class="token assign-left variable">DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV4_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">IPV6INIT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_AUTOCONF</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">IPV6_ADDR_GEN_MODE</span><span class="token operator">=</span><span class="token string">&quot;stable-privacy&quot;</span>
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;em1&quot;</span>
<span class="token assign-left variable">UUID</span><span class="token operator">=</span><span class="token string">&quot;aad591b3-181d-4506-ba9c-3bb3fc32f45f&quot;</span>
<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span><span class="token string">&quot;em1&quot;</span>
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span> <span class="token comment">#开机自动启用本配置</span>

<span class="token comment"># 以下四项不设置可能无法正常联网，一定要设置</span>
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.50.1 <span class="token comment">#网关 根据自己需要配置</span>
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token number">255.255</span>.254.0 <span class="token comment">#子网掩码 根据自己需要配置</span>
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token number">114.114</span>.114.114 <span class="token comment">#重要</span>
<span class="token assign-left variable">DNS2</span><span class="token operator">=</span><span class="token number">8.8</span>.8.8 <span class="token comment">#重要</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/sysconfig/network-scripts/ifcfg-em1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按照上述要求更改，最后保存</p><h2 id="检查最后配置是否生效" tabindex="-1"><a class="header-anchor" href="#检查最后配置是否生效" aria-hidden="true">#</a> 检查最后配置是否生效</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token function">service</span> network restart <span class="token comment">#CentOS6 使用命令重启网络服务</span>

systemctl restart network <span class="token comment">#CentOS7 使用命令重启网络服务</span>

<span class="token function">ifconfig</span> <span class="token comment">#查看是否生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到网卡信息变了，证明正确更改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>em1: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">&gt;</span>  mtu <span class="token number">1500</span>
        inet <span class="token number">192.168</span>.50.106  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">192.168</span>.50.255
        inet6 fe80::81e:8807:f229:bb59  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">&gt;</span>
        ether ec:f4:bb:ec:ea:88  txqueuelen <span class="token number">1000</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">41165</span>  bytes <span class="token number">33362155</span> <span class="token punctuation">(</span><span class="token number">31.8</span> MiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">10271</span>  bytes <span class="token number">743889</span> <span class="token punctuation">(</span><span class="token number">726.4</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),l=[t];function o(i,r){return n(),a("div",null,l)}const u=s(p,[["render",o],["__file","dhcp-static.html.vue"]]);export{u as default};
