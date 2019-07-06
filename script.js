var container;
var tiles = Array(25);
var checked = Array(25);

var ids = 'A1,A2,A3,A4,A5,B1,B2,B3,B4,B5,C1,C2,C3,C4,C5,D1,D2,D3,D4,D5,E1,E2,E3,E4,E5'.split(',');

function cup_validate()
{
	for(var i = 0; i < 25; i++)
	{
		checked[i] = document.querySelector('#' + ids[i] + ':checked') ? true : false;
	}
	function check(n, cond)
	{
		tiles[n].classList[(!checked[n] == !cond) ? 'add' : 'remove']('invalid');
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
	var s = checked[20] && checked[16] && checked[12] && checked[8] && checked[4] ? 1 : 0;
	var q = checked[0] && checked[6] && checked[12] && checked[18] && checked[24] ? 1 : 0;
	var hn = 0, vn = 0, c = 0, n = 0, l = 0, t = 0;
	for(var i = 0; i < 5; i++)
	{
		if(h[i]) hn++;
		if(v[i]) vn++;
		for(var j = 0; j < 5; j++)
		{
			if(checked[i * 5 + j])
			{
				if(h[i] || v[j] || s && i + j == 4 || q && i == j)
				{
					l++;
				}
				else
				{
					t++;
				}
				n++;
			}
		}
		if(checked[i * 5 + 2])
		{
			c++;
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
	check(8, n > 17);
	check(9, l % 2);
	check(10, !(h[2] || v[0]));
	check(11, t < 5);
	check(12, checked[12] && !(s || q || h[2] || v[2]));
	check(13, vn < 2);
	check(14, 25 - l < 10);
	check(15, checked[5]);
	check(16, !(h[1] || v[3]));
	check(17, c > 3);
	check(18, !checked[3]);
	check(19, !s && !q);
	check(20, !checked[24]);
	check(21, true);
	check(22, !checked[22]);
	check(23, (hn + vn + s + q) < 3);
	check(24, !checked[20]);
}

window.addEventListener("load", function (e)
{
	function listener()
	{
		setTimeout(cup_validate, 100);
	}
	container = document.getElementsByTagName('section')[0];
	var tmp = container.querySelectorAll('label');
	for(var i = 0; i < 25; i++)
	{
		(tiles[i] = tmp[i]).addEventListener('click', listener);
	}
	cup_validate();
});
