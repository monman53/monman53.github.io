## Characters

ABCDEFGHIJKLMNOPQRSTUVWXYZ

abcdefghijklmnopqrstuvwxyz

!@#$%^&*()_+|~

1234567890-=\`

あいうえおかきくけこ

漢字

## Header

# h1

h1 contents

## h2

h2 contents

### h3

h3 contents

#### h4

h4 contents

## Listing

* aaaa
* bbbb
  * cccc
  * dddd
    * eeee
    * ffff
  * gggg
* hhhh

## Code blocks

### Python

```python
import numpy as np

a = 0

for i in range(5):
  print(i)
```

### C++

```cpp
// 二分探索(半開区間)
int l = 0;
int r = n;
while(l != r){
    int c = (l+r)/2;
    if(v[c] == value){
        flag = true;
        break;
    }
    if(v[c] < value){
        l = c+1;
    }else{
        r = c;
    }
}

// 天井関数( a/b )
(a+b-1)/b

// λ関数でソート
sort(v.begin(), v.end(), [](struct E &e1, struct E &e2){return e1.v < e2.v;});

// ビット演算
i & -i; // iの最後の1のビット

// パスカルの三角形
LL comb[n+1][n+1];
for(int i=0;i<=n;i++){
    for(int j=0;j<=n;j++){
        if(j > i){
            comb[i][j] = 0LL;
        }else if(j == 0 || j == i){
            comb[i][j] = 1LL;
        }else{
            comb[i][j] = comb[i-1][j-1]+comb[i-1][j];
        }
    }
}
```