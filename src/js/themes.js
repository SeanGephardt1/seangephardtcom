const AppThemes = [
	{
		Name: "Blue Theme",
		Foreground: "rgba(255,255,255,1)",
		Background: "rgba(39, 93, 173, 1)",
		FontFamily: "Segoe UI, system-ui"
	},
	{
		Name: "Green Theme",
		Foreground: "rgba(255,255,255,1)",
		Background: "rgba(0,96,0,1)",
		FontFamily: 'Hit the Road Regular'
	},
	//{
	//	Name: "Villains Of Yesterday Theme",
	//	Foreground: "rgba(255,255,255,1)",
	//	Background: "rgba(128,0,0,1)",
	//	FontFamily: 'Abite'
	//},
	//{
	//	Name: "Greyscale Theme",
	//	Foreground: "rgba(0,0,0,1)",
	//	Background: "rgba(192, 192, 192, 1)",
	//	FontFamily: 'Tahoma'
	//},
	{
		Name: "Light Theme",
		Foreground: "rgba(0,0,0,1)",
		Background: "rgba(255,255,255,1)",
		FontFamily: "Arial",
		Padding: "10px 10px 10px 10px",
		LinkPadding: "5px 15px 5px 15px"
	},
];

export
{
	AppThemes as Themes
}