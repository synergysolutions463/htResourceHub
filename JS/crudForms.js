var loggedIn = false;

function testAjax() {
	console.log("test ajax worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "readTest"
		},
		success: function(data) {
			console.log(data[0, 0]);

			var parsedData = JSON.parse(data);
			var books = parsedData;
			console.log(books[0]);

		}
	});
}

function readAllOrgs() {
	console.log("read all orgs beginning worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "readAllOrgs"
		},
		success: function(data) {
			console.log(data);

			var parsedData = JSON.parse(data);
			var orgs = parsedData;

			loadSimpleData(orgs);

		}

	});
}

function simpleSearchOrgs() {
	var counseling = document.getElementById("counseling").checked;
	var employment = document.getElementById("employment").checked;
	var legal = document.getElementById("legal").checked;
	var medical = document.getElementById("medical").checked;
	var shelter = document.getElementById("shelter").checked;
	var substanceAbuse = document.getElementById("substanceAbuse").checked;

	console.log("simple search beginning worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "simpleSearchOrgs",
			counseling: counseling.toString(),
			employment: employment.toString(),
			legal: legal.toString(),
			medical: medical.toString(),
			shelter: shelter.toString(),
			substanceAbuse: substanceAbuse.toString()
		},
		success: function(data) {
			console.log("connection to php worked with simple search");
			console.log(data);

			var parsedData = JSON.parse(data);
			var orgs = parsedData;

			loadSimpleData(orgs);

		}
	});
}

function advSearchOrgs() {
	var clothingRsc = document.getElementById("clothingResourceCB").checked;
	var foodRsc = document.getElementById("foodResourceCB").checked;
	var employmentRsc = document.getElementById("employmentResourceCB").checked;
	var mentoringRsc = document.getElementById("mentoringResourceCB").checked;
	var counselingRsc = document.getElementById("counselingResourceCB").checked;
	var pregnancyRsc = document.getElementById("pregnancyResourceCB").checked;
	var medicalRsc = document.getElementById("medicalResourceCB").checked;
	var legalRsc = document.getElementById("legalResourceCB").checked;
	var governmentalRsc = document.getElementById("governmentalResourceCB").checked;
	var investigationRsc = document.getElementById("investigationResourceCB").checked;
	var fosterCareRsc = document.getElementById("fosterCareResourceCB").checked;
	var educationRsc = document.getElementById("educationResourceCB").checked;
	var responseTrainingRsc = document.getElementById("responseTrainingResourceCB").checked;
	var substanceAbuseRsc = document.getElementById("substanceAbuseResourceCB").checked;
	var shelterHsg = document.getElementById("shelterHousingCB").checked;
	var transitionalHsg = document.getElementById("transitionalHousingCB").checked;
	var asstLocHsg = document.getElementById("assistanceHousingCB").checked;
	var domesticNat = document.getElementById("domesticNatCB").checked;
	var foreignNat = document.getElementById("foreignNatCB").checked;
	var undocumentedNat = document.getElementById("undocumentedNatCB").checked;
	var maleGdr = document.getElementById("maleGenderCB").checked;
	var transGdr = document.getElementById("transGenderCB").checked;
	var femaleGdr = document.getElementById("femaleGenderCB").checked;
	var infantsAge = document.getElementById("infantsAgeCB").checked;
	var childrenAge = document.getElementById("childrenAgeCB").checked;
	var youthAge = document.getElementById("youthAdultsAgeCB").checked;
	var adultsAge = document.getElementById("adultsAgeCB").checked;
	var feeFree = document.getElementById("freeFeeCB").checked;
	var hours247 = document.getElementById("hoursCB").checked;
	var searchTxt = document.getElementById("advSearchTxt").value;
	var cityTxt = document.getElementById("citySearchTxt").value;


	console.log("adv search beginning worked")
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "advSearchOrgs",
			clothingRsc: clothingRsc.toString(),
			foodRsc: foodRsc.toString(),
			employmentRsc: employmentRsc.toString(),
			mentoringRsc: mentoringRsc.toString(),
			counselingRsc: counselingRsc.toString(),
			pregnancyRsc: pregnancyRsc.toString(),
			medicalRsc: medicalRsc.toString(),
			legalRsc: legalRsc.toString(),
			governmentalRsc: governmentalRsc.toString(),
			investigationRsc: investigationRsc.toString(),
			fosterCareRsc: fosterCareRsc.toString(),
			educationRsc: educationRsc.toString(),
			responseTrainingRsc: responseTrainingRsc.toString(),
			substanceAbuseRsc: substanceAbuseRsc.toString(),
			cityTxt: cityTxt,
			searchTxt: searchTxt,
			hours247: hours247.toString(),
			feeFree: feeFree.toString(),
			adultsAge: adultsAge.toString(),
			youthAge: youthAge.toString(),
			childrenAge: childrenAge.toString(),
			infantsAge: infantsAge.toString(),
			femaleGdr: femaleGdr.toString(),
			transGdr: transGdr.toString(),
			maleGdr: maleGdr.toString(),
			undocumentedNat: undocumentedNat.toString(),
			foreignNat: foreignNat.toString(),
			domesticNat: domesticNat.toString(),
			asstLocHsg: asstLocHsg.toString(),
			transitionalHsg: transitionalHsg.toString(),
			shelterHsg: shelterHsg.toString()
		},
		success: function(data) {
			console.log(data);

			var parsedData = JSON.parse(data);
			var orgs = parsedData;

			loadSimpleData(orgs);

		}
	});
}

function hide(target) {
	document.getElementById(target).style.display = 'none';
}

function show(target) {
	document.getElementById(target).style.display = 'block';
}

function login() {
	var username = document.getElementById("usernameTxt").value;
	var password = document.getElementById("passwordTxt").value;

	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "login",
			username: username,
			password: password
		},
		success: function(data) {
			console.log(data);
			if (data == "logged in") {
				loggedIn = true;
			}
			else {
				loggedIn = false;
			}

			console.log(loggedIn);
		}
	});

}

function logout() {

}

function updateOrg() {

}

function createOrg() {

}

function deleteOrg() {

}

function loadSimpleData(orgs) {

	oLen = orgs.length;

	text = "";

	for (i = 0; i < oLen; i++) {

		if (loggedIn == false) {
			//		if (orgs[i][7] == 0) {
			//			if (orgs[i][8] == 1) {
			text += "<div class=\"panel\" id=\"indiPanel\">" +
				"<div class=\"row\">" +
				"<div class=\"col-md-4 col-md-offset-2\">";

			text += "<div class=\"organization-info " + orgs[i][0] + "\">";

			text += "<h2><a href=\"orgInfo.html\" style=\"cursor: pointer;\ class=\"orgLink\">";
			text += orgs[i][1];
			text += "</a></h2>";


			if (orgs[i][15] == 1) {
				text += "<h3>Open 24-Hours</h3>";
			}

			text += "<p>Phone: ";

			if (orgs[i][2] == "" || orgs[i][2] == null) {
				text += "N/A</p>";
			}
			else {
				text += orgs[i][2] + "</p>";
			}

			text += "<h5>Hotline: ";

			if (orgs[i][3] == "" || orgs[i][3] == null) {
				text += "N/A</h5>";
			}
			else {
				text += orgs[i][3] + "</h5>";
			}

			text += "<p>Email: ";

			if (orgs[i][5] == "" || orgs[i][5] == null) {
				text += "N/A</p>";
			}
			else {
				text += orgs[i][5] + "</p>";
			}
			text += "</div> </div> ";

			text += " <div class=\"col-md-4\">" +
				"<div class=\"resource-info\">" +
				"<br>" +
				"<p>OFFERED RESOURCES</p>" +
				"<ul>" +
				"<li>Housing</li>" +
				"<li>Mentoring</li>" +
				"<li>Awareness/Education</li>" +
				"<li>Other</li>" +
				"</ul>" +
				"</div> </div> </div> </div>";

			document.getElementById("resultPanel").innerHTML = text;

			//			}
			//		}

		}



	}








}

function loadComplexData() {

}

function insertOrganization() {

	var orgName = document.getElementById("txtOrgNameCreate").value;
	var agencyName = document.getElementById("txtOrgProgramCreate").value;
	var missionStmt = document.getElementById("txtMissionStatementCreate").value;
	var weblink = document.getElementById("txtOrgWebsiteCreate").value;
	var email = document.getElementById("txtOrgEmailCreate").value;
	var phoneNum = document.getElementById("txtMainPhoneCreate").value;
	var hotlineNum = document.getElementById("txtHotlineCreate").value;
	var confNum = document.getElementById("txtConfPhoneCreate").value;
	var isShelter = document.getElementById("cbShelterCreate").checked;
	var isTransHousing = document.getElementById("cbTransitionalHousingCreate").checked;
	var isAsstLoc = document.getElementById("cbAssistLocateHousingCreate").checked;
	var fee = 0;
	/*change to faith dropdown */
	var faith = document.getElementById("txtFaithCreate").value;
	var notes = document.getElementById("txtNoteCreate").value;
	var confNotes = document.getElementById("txtConfidentialNoteCreate").value;
	var isConf = document.getElementById("cbIsConfCreate").checked;

	if (document.getElementById("cbFreeCreate").checked == true) {
		var fee = 0;
	}
	else {
		var fee = document.getElementById("txtAssociatedFeeCreate");
	}

	console.log("simple search beginning worked")
	$.ajax({
		url: '/PHP/createOrgAjax.php',
		type: 'POST',
		data: {
			method: "insertOrganization",
			orgName: orgName,
				agencyName: agencyName,
				missionStmt: missionStmt,
				weblink: weblink,
				email: email,
				phoneNum: phoneNum,
				hotlineNum: hotlineNum,
				confNum: confNum,
				isShelter: isShelter.toString(),
				isTransHousing: isTransHousing.toString(),
				isAsstLoc: isAsstLoc.toString(),
				fee: fee,
				faith: faith,
				notes: notes,
				confNotes: confNotes,
				isConf: isConf.toString()
		},
		success: function(data) {
			console.log("connection to php worked with simple search");
			console.log(data);

		}
	});







}
