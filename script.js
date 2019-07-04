var container;
var tiles = Array(25);
var checked = Array(25);

function cup_onToggle(n)
{
	tiles[n].classList[(checked[n] = !checked[n]) ? 'add' : 'remove']('checked');
	cup_validate();
}

function cup_validate()
{
	function check(n, cond)
	{
		tiles[n].classList[cond ? 'remove' : 'add']('invalid');
	}
	function popcount(n)
	{
		var tmp = n - ((n >> 1) & 033333333333)
					- ((n >> 2) & 011111111111);
		return ((tmp + (tmp >> 3)) & 030707070707) % 63;
	}
	var h = [
		checked[0] && checked[1] && checked[2] && checked[3] && checked[4],
		checked[5] && checked[6] && checked[7] && checked[8] && checked[9],
		checked[10] && checked[11] && checked[12] && checked[13] && checked[14],
		checked[15] && checked[16] && checked[17] && checked[18] && checked[19],
		checked[20] && checked[21] && checked[22] && checked[23] && checked[24]
	];
	var v = [
		checked[0] && checked[5] && checked[10] && checked[15] && checked[20],
		checked[1] && checked[6] && checked[11] && checked[16] && checked[21],
		checked[2] && checked[7] && checked[12] && checked[17] && checked[22],
		checked[3] && checked[8] && checked[13] && checked[18] && checked[23],
		checked[4] && checked[9] && checked[14] && checked[19] && checked[24]
	];
	var s = checked[20] && checked[16] && checked[12] && checked[8] && checked[4];
	var q = checked[0] && checked[6] && checked[12] && checked[18] && checked[24];
	var hn = 0, vn = 0, c = 0, n = 0, l = 0;
	for(var i = 0; i < 5; i++)
	{
		if(h[i]) hn++;
		if(v[i]) vn++;
		if(s) l |= 1 << (20 - i * 5 + i);
		if(q) l |= 1 << (i * 6);
		for(var j = 0; j < 5; j++)
		{
			if(checked[i * 6 + j])
			{
				n++;
				if(j == 2) c++;
			}
			if(v[i] || h[j]) l |= 1 << (i * 5 + j);
		}
	}
	check(0, s);
	check(1, (h[0] || v[1]));
	check(2, !q);
	check(3, !checked[18]);
	check(4, !(h[0] || v[4] || s));
	check(5, checked[15]);
	check(6, (!hn || !vn || (!s && !q)));
	check(7, !checked[7]);
	check(8, popcount(i) > 17);
	check(9, popcount(l) % 2);
	check(10, !(h[2] || v[0]));
	check(11, popcount(i & ~l & 33554431) < 5);
	check(12, !(s || q || h[2] || v[2]));
	check(13, vn < 2);
	check(14, popcount(~l & 33554431) < 10);
	check(15, checked[5]);
	check(16, !(h[1] || v[3]));
	check(17, c > 3);
	check(18, !checked[3]);
	check(19, !s && !q);
	check(20, !checked[24]);
	check(21, 0);
	check(22, !checked[22]);
	check(23, (hn + vn + s + q) < 3);
	check(24, !checked[20]);
}

window.addEventListener("load", function (e)
{
	function getFunction(n)
	{
		return function ()
		{
			cup_onToggle(n);
		}
	}
	container = document.getElementsByTagName('TABLE')[0];
	var tmp = container.querySelectorAll('td');
	for(var i = 0; i < 25; i++)
	{
		(tiles[i] = tmp[i]).addEventListener('click', getFunction(i));
	}
	cup_validate();
});
