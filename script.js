var container;
var tiles = Array(25);

function cup_onToggle(n)
{
	console.log(n);
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
});
