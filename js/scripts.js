var model = {
	bands: [
		{
			mentor: "",
			dj1: "",
			dj2: "",
			votes: 0
		},
		{
			mentor: "",
			dj1: "",
			dj2: "",
			votes: 0
		},
		{
			showResults: 0
		}
	],
	mentors: {
		Misty: {
			image: "https://heydjmusic.com/wp-content/uploads/2019/02/MISTY.jpg",
			color: "#00c2ae"
		},
		A_Squared: {
			image: "https://heydjmusic.com/wp-content/uploads/2019/02/A-SQUARED.jpg",
			color: "#f45b00"
		},
		Mohasseb: {
			image: "https://heydjmusic.com/wp-content/uploads/2019/02/MOHASSEB.jpg",
			color: "#6e1390"
		},
		Ashmawy: {
			image: "https://heydjmusic.com/wp-content/uploads/2019/02/ASHMAWY.jpg",
			color: "#62d350"
		}
	}
};

if (localStorage.getItem("band")) {
	model.bands = JSON.parse(localStorage.getItem("band"));
}
//console.log(model);
var voteCounter = function(obj, e, band) {
	e.preventDefault();
	model.bands = JSON.parse(localStorage.getItem("band"));
	if (model.bands[2].showResults == 0) {
		if (band == "band1") {
			model.bands[0].votes = model.bands[0].votes + 1;
		} else if (band == "band2") {
			model.bands[1].votes = model.bands[1].votes + 1;
		}

		model.bands[2].showResults = 1;
		obj.setAttribute("class", "band first hvr-grow clicked");
		localStorage.setItem("band", JSON.stringify(model.bands));
	}
	document.getElementById("voted1").style.display = "block";
	//document.getElementById("voted2").style.display = "block";
	loadFrontEnd();
	setTimeout(function() {
		obj.setAttribute("class", "band first hvr-grow");
		document.getElementById("voted1").style.display = "none";
		//document.getElementById("voted2").style.display = "none";
		model.bands[2].showResults = 0;
		localStorage.setItem("band", JSON.stringify(model.bands));
		loadFrontEnd();
	}, 3000);
};

var loadFrontEnd = function(obj, e) {
	//console.log(model.bands[0].mentor);
	if (model.bands[0].mentor == "" && model.bands[1].mentor == "") {
		document.getElementById("no-content").style.display = "block";
		document.getElementById("with-content").style.display = "none";
	} else {
		document.getElementById("band-img-1").src = model.mentors[model.bands[0].mentor].image;
		document.getElementById("band-img-2").src = model.mentors[model.bands[1].mentor].image;

		var m1 = model.bands[0].mentor;
		var m2 = model.bands[1].mentor;
		document.getElementById("band-name-1").innerText = m1.replace("_", "-");
		document.getElementById("band-name-1").style.color = model.mentors[model.bands[0].mentor].color;

		document.getElementById("band-name-2").innerText = m2.replace("_", "-");
		document.getElementById("band-name-2").style.color = model.mentors[model.bands[1].mentor].color;

		document.getElementById("dj1-name-1").innerText = model.bands[0].dj1;
		document.getElementById("dj2-name-1").innerText = model.bands[0].dj2;

		document.getElementById("dj1-name-2").innerText = model.bands[1].dj1;
		document.getElementById("dj2-name-2").innerText = model.bands[1].dj2;

		if (model.bands[2].showResults == 1) {
			var totalVotes = model.bands[0].votes + model.bands[1].votes;
			document.getElementById("voting-number-1").innerText = Math.round(
				(model.bands[0].votes / totalVotes) * 100
			);
			document.getElementById("voting-number-2").innerText = Math.round(
				(model.bands[1].votes / totalVotes) * 100
			);

			document
				.getElementById("progress-1")
				.setAttribute("data-color", model.mentors[model.bands[0].mentor].color.replace("#", ""));
			document.getElementById("progressz-1").style.backgroundColor =
				model.mentors[model.bands[0].mentor].color;
			document
				.getElementById("progress-1")
				.setAttribute(
					"data-progresspercent",
					Math.round((model.bands[0].votes / totalVotes) * 100)
				);

			document
				.getElementById("progress-2")
				.setAttribute("data-color", model.mentors[model.bands[1].mentor].color.replace("#", ""));
			document.getElementById("progressz-2").style.backgroundColor =
				model.mentors[model.bands[1].mentor].color;
			document
				.getElementById("progress-2")
				.setAttribute(
					"data-progresspercent",
					Math.round((model.bands[1].votes / totalVotes) * 100)
				);

			document.getElementById("v-res-1").style.display = "block";
			document.getElementById("v-res-2").style.display = "block";
		} else {
			document.getElementById("v-res-1").style.display = "none";
			document.getElementById("v-res-2").style.display = "none";
		}
	}
};

var saveData = function(obj, e) {
	var e1 = document.getElementById("mentor_sel-1");
	model.bands[0].mentor = e1.options[e1.selectedIndex].value;

	model.bands[0].dj1 = document.getElementById("DJ1-1").value;
	model.bands[0].dj2 = document.getElementById("DJ2-1").value;

	var e2 = document.getElementById("mentor_sel-2");
	console.log(e2.options[e2.selectedIndex].value);
	model.bands[1].mentor = e2.options[e2.selectedIndex].value;

	model.bands[1].dj1 = document.getElementById("DJ1-2").value;
	model.bands[1].dj2 = document.getElementById("DJ2-2").value;

	localStorage.setItem("band", JSON.stringify(model.bands));
	//console.log(model.bands);
};

var resetData = function(obj, e) {
	console.log(model.bands);

	localStorage.setItem(
		"band",
		JSON.stringify([
			{
				mentor: "",
				dj1: "",
				dj2: "",
				votes: 0
			},
			{
				mentor: "",
				dj1: "",
				dj2: "",
				votes: 0
			},
			{
				showResults: 0
			}
		])
	);
};

var showResults = function(obj, e) {
	e.preventDefault();
	model.bands = JSON.parse(localStorage.getItem("band"));
	model.bands[2].showResults = 1;
	localStorage.setItem("band", JSON.stringify(model.bands));
};
if (document.getElementById("voting-number-1")) loadFrontEnd();

var convertArrayOfObjectsToCSV = function(args) {
	var result, ctr, keys, columnDelimiter, lineDelimiter, data;

	data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}

	columnDelimiter = args.columnDelimiter || ",";
	lineDelimiter = args.lineDelimiter || "\n";

	keys = Object.keys(data[0]);

	result = "";
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	data.forEach(function(item) {
		ctr = 0;
		keys.forEach(function(key) {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
};

var exportData = function(obj, e) {
	var data, filename, link;
	var csv = convertArrayOfObjectsToCSV({
		data: [model.bands[0], model.bands[1]]
	});
	if (csv == null) return;

	filename = "export.csv";

	if (!csv.match(/^data:text\/csv/i)) {
		csv = "data:text/csv;charset=utf-8," + csv;
	}
	data = encodeURI(csv);

	link = document.createElement("a");
	link.setAttribute("href", data);
	link.setAttribute("download", filename);
	link.click();
};

(function($) {
	"use strict"; // Start of use strict
	var progressSelector = $(".progress-wrap");
	progressSelector.each(function() {
		var getPercent = $(this).attr("data-progresspercent");
		var getSpeed = parseInt($(this).attr("data-speed"));
		var getColor = $(this).attr("data-color");
		var getHeight = $(this).attr("data-height");
		var getWidth = $(this).attr("data-width");
		$(this).css({ height: getHeight, width: getWidth });
		$(this)
			.find(".progress-bar")
			.css({ "background-color": "#" + getColor })
			.animate({ width: getPercent + "%" }, getSpeed);
	});
})(jQuery); // End of use strict
