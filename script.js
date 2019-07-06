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
	var cond = [
		s,
		h[0] || v[1],
		!q,
		!checked[18],
		!(h[0] || v[4] || s),
		checked[15],
		(!hn || !vn || (!s && !q)),
		!checked[7],
		n > 17,
		l % 2,
		!(h[2] || v[0]),
		t < 5,
		checked[12] && !(s || q || h[2] || v[2]),
		vn < 2,
		25 - l < 10,
		checked[5],
		!(h[1] || v[3]),
		c > 3,
		!checked[3],
		!s && !q,
		!checked[24],
		true,
		!checked[22],
		hn + vn + s + q < 3,
		!checked[20]
	];
	for(var i = 0; i < 25; i++)
	{
		tiles[i].classList[(!checked[i] == !cond[i]) ? 'add' : 'remove']('invalid');
	}
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
