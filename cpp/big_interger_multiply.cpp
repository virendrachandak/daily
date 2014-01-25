#include <cstdio>
#include <cstring>
#include <iostream>
#include <algorithm>
#include <cmath>
#include <map>
#include <ctime>
#include <vector>
#include <string>


using namespace std;

typedef long long ll;

const int N = 20000; 
struct T{
	int v[N];
	int len;
	T(){
		memset(v, 0, sizeof(v));
		len = 0;
	}
	void print()
	{
		if(len == 0) {
			printf("0");
		} else {
			for(int i = len - 1; i >= 0; --i) {
				printf("%d", v[i]);
			}
		}
		puts("");
	}
};

T operator * (const T& a, const T& b)
{
	T c;
	c.len = a.len + b.len;
	
	for	(int i = 0; i < a.len; ++i) {
		for(int j = 0; j < b.len; ++j) {
			c.v[i+j] += a.v[i]*b.v[j];
		}
	}
	int carry = 0, tmp = 0;
	for(int i = 0; i < c.len; ++i) {
		tmp = c.v[i] + carry;
		c.v[i] = tmp % 10;
		carry = tmp / 10;
	}
	while (c.v[c.len -1] == 0) --c.len;
	return c;
}

void test()
{
	T a, b;
	a.len = 2;
	a.v[0] = 1;
	a.v[1] = 2;
	b.len = 2;
	b.v[0] = 1;
	b.v[1] = 2;
	a.print();
	b.print();
	T c = a*b;
	c.print();
}

T power(T& a, int b)
{
	T res;
	res.len = 1;
	res.v[0] = 1;
	while(b) {
		if(b&1) res = res*a;
		b >>= 1;
		if(b) a = a*a;
		printf("%d\n", a.len);
	}
	return res;
}

void run()
{
	T v;
	v.len = 1;
	v.v[0] = 2;
	T res = power(v, 65536);
	res.print();
	puts("");
}

int main()
{
	test();
	run();
}
