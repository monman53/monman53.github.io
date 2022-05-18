# 非線形科学

## 反応拡散系

魚の体表の模様などのモデル．

### Gray-Scott モデル

2種類の物質からなる．

$$
\begin{align}
\frac{\partial u}{\partial t} &= D_u\Delta u - uv^2 + f(1-u) \\
\frac{\partial v}{\partial t} &= D_v\Delta v + uv^2 - (f+k)v
\end{align}
$$

#### 差分形式

$u$ に関して，特に2次元平面上においては，

$$
\Delta u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}
$$

であるから，微分方程式は，

$$
\frac{\partial u}{\partial t} = D_u\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}\right) - uv^2 + f(1-u)
$$

となり， $(x, y)$ においては次のように書ける．

$$
\frac{\partial u_{x, y}}{\partial t} = D_u\left(\frac{\partial^2 u_{x, y}}{\partial x^2} + \frac{\partial^2 u_{x, y}}{\partial y^2}\right) - u_{x, y}v_{x, y}^2 + f(1-u_{x, y})
$$

これを，差分形式，

$$
\begin{align}
\frac{\partial^2 u_{x, y}}{\partial x^2} &\simeq \frac{u_{x+h, y}+u_{x-h, y}-2u_{x, y}}{h^2} \\\\
\frac{\partial^2 u_{x, y}}{\partial y^2} &\simeq \frac{u_{x, y+h}+u_{x, y-h}-2u_{x, y}}{h^2}
\end{align}
$$

を用いて表すと，

$$
\begin{align}
\frac{\partial u_{x, y}}{\partial t} &\simeq D_u\left(\frac{u_{x+h, y}+u_{x-h, y}-2u_{x, y}}{h^2} + \frac{u_{x, y+h}+u_{x, y-h}-2u_{x, y}}{h^2}\right) - u_{x, y}v_{x, y}^2 + f(1-u_{x, y}) \\\\
 &= D_u\left(\frac{u_{x+h, y}+u_{x-h, y}+u_{x, y+h}+u_{x, y-h}-4u_{x, y}}{h^2}\right) - u_{x, y}v_{x, y}^2 + f(1-u_{x, y})
\end{align}
$$

となる． $v$ も同様にして，

$$
\frac{\partial v_{x, y}}{\partial t} \simeq D_v\left(\frac{v_{x+h, y}+v_{x-h, y}+v_{x, y+h}+v_{x, y-h}-4v_{x, y}}{h^2}\right) + u_{x, y}v_{x, y}^2 - (f+k)v_{x, y}
$$

と書ける．

シミュレーションする場合は，各 $(x, y)$ について，次のようにオイラー法などで数値計算すればよい．

$$
\begin{align}
u_{x, y}^{t+\delta t} &= u_{x, y}^{t} + \frac{\partial u_{x, y}}{\partial t} \delta t \\\\
v_{x, y}^{t+\delta t} &= v_{x, y}^{t} + \frac{\partial v_{x, y}}{\partial t} \delta t
\end{align}
$$
