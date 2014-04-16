�ƶ�������API
---
> [CSSý���ѯ4](http://dev.w3.org/csswg/mediaqueries4/#luminosity)������`luminosity`ý�幦�ܣ�feature�����߽�����Ҳ�У����ֻ����ݻ����Զ��������ȵĹ���������ƶ������Լ�����Ӧʽ��������ȡ����ˡ������·����Եø�����Ҫ��������ǰ����������Щ����ͨWEB������ϻ�û�еõ�֧�ֺ�ʵ�ֵ�`luminosity`��

### �������¼�API

HTML5[`�豸API��Device API��`](http://www.w3.org/2009/dap/)�а�����[`�������¼���Ambient Light Events��`](http://www.w3.org/TR/ambient-light/)��ͨ�����API����ʹ�ü򵥵�JavaScript���ʹ���/��Ƭ��������

���ǿ���ʹ�����API��ģ��CSS4ý���ѯ�����Թ��������Ӧ��WEB���ݡ�

### `Devicelight events`���豸�����¼���

������ڹ��ߴ�������⵽������ȼ���ı�ʱ�����`DeviceLightEvent`�¼�������ʹ��`devicelight`�¼�����׽��

```javascript
window.addEventListener('devicelight', function(event) {
    console.log(event.value + 'lux');
});
```

### ��������ӦʽWEB����

һ���򵥵�demo�����߻��������������޸�UI��

*	Ĭ�ϣ���ɫ���֣�ǳ��ɫ������
*	���⣺��ɫ���֣���ɫ������
*	���⣺��ɫ���֣���ɫ������

```javascript
window.addEventListener('devicelight', function(e) {
    var lux = e.value;

    if (lux < 50) {  // dim
        document.body.className = 'dim';
    }
    if (lux >= 50 && lux <= 1000) {
        document.body.className = 'normal';
    }
    if (lux > 1000) { // bright
        document.body.className = 'right';
    }
});
```

```css
body, body.normal {
    background-color: #ddd;
    color: #111;
}

body.dim {
    background-color: #444;
    color: #fff;
}

body.bright {
    background-color: #fff;
    color: #333;
}
```

[codepen�ϵ�Դ����](http://codepen.io/girliemac/pen/pvmBs)

������������Ҫ����һ�£�

Ŀǰ���APIֻ��Firefox22+֧�֣�������Ҫ�䱸���Ӧ����

### CSS4 ý���ѯ`luminosity`

Ŀǰ��2014��1��12�ţ���ݹ淶��Ȼ����`editor's draft`�׶Σ�����Ȼ�ǳ����ȶ���������Ҫ�ܳ�ʱ��Ż����������֧�ֺ�ʵ�֡�

����CSS4��`luminosity`���Ժ�����Ĵ�����Ըĳ�����CSS���룺


```css
@media screen and (luminosity: normal) {
    body {background-color:#ddd; color:#111;}
}
@media screen and (luminosity: dim) {
    body {background-color: #444; color: #fff;}
}
@media screen and (luminosity: washed) {
    body {background-color: #fff; color: #333;}
}
```

### ���

��Ӧʽ�����նˣ����������ӣ���ͳWEBԽ��Խ�л�������ʼ��͸����������ķ������棬������ǰ���ֻ�����ӡ��ű�С�ӡ�����������˭Ҳ����С�ơ�WEB�ڿ͡���ɱ������ǰ�˹���ʦ�����ص�Զ��

### �ο�����
1.	[Responsive UI with Luminosity Level](http://girliemac.com/blog/2014/01/12/luminosity/)
