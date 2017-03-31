var loggedIn = true;

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

			if (data == "No results found") {
				var text = "<h2>No results found</h2>";
				document.getElementById("resultPanel").innerHTML = text;
			}
			else {
				var parsedData = JSON.parse(data);
				var orgs = parsedData;
				loadSimpleData(orgs);
			}

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

function loadSimpleData(orgs) {

	oLen = orgs.length;

	text = "";

	for (i = 0; i < oLen; i++) {

		text += "<div class=\"panel\" id=\"indiPanel\">";
		text += "<div class=\"row\">";
		text += "<div class=\"col-md-4 col-md-offset-2\">";
		text += "<div class=\"organization-info\">";
		text += "<h2><a href=\"orgInfo.html\" onclick=\"getComplexData(" + orgs[i][0] + ")\" style=\"cursor: pointer;\">";
		text += orgs[i][1] + "</a></h2>";

		if (orgs[i][18] == 1) {
			text += "<h4>Open 24-Hours</h4>";
		}

		var myNum = orgs[i][2];
		if (myNum != null) {
			myNum = myNum.replace(/\D/g, '');
		}

		var myHotline = orgs[i][2];
		if (myHotline != null) {
			myHotline = myHotline.replace(/\D/g, '');
		}



		text += "<p><a href=\"tel:" + myNum + "\">Phone: ";
		if (orgs[i][2] == null || orgs[i][2] == "" || orgs[i][2] == "+1 ") {
			text += "N/A";
		}
		else {
			text += orgs[i][2];

			if (orgs[i][3] == null || orgs[i][3] == "") {
				text += "";
			}
			else {
				text += " Ext. " + orgs[i][3];
			}

		}
		text += "</a></p>";

		text += "<h5><a href=\"tel:" + myHotline + "\">24-Hour Hotline: ";
		if (orgs[i][4] == null || orgs[i][4] == "" || orgs[i][4] == "+1 ") {
			text += "N/A";
		}
		else {
			text += orgs[i][4];
		}
		text += "</a></h5>"

		text += "<p>Website: "
		if (orgs[i][7] == null || orgs[i][7] == "") {
			text += "N/A";
		}
		else {
			text += "<a href=\"" + orgs[i][7] + "\" target=\"_blank\">" + orgs[i][7] + "</a>";
		}
		text += "</p>";

		text += "<p>Email: ";
		if (orgs[i][8] == null || orgs[i][8] == "") {
			text += "N/A";
		}
		else {
			text += orgs[i][8];
		}
		text += "</p>";

		text += "</div> </div>";
		text += "<div class=\"col-md-4\">";
		text += "<div class=\"resource-info\">";
		text += "<br>";
		text += "<p>OFFERED RESOURCES</p>";
		text += "<ul>";

		var offeredResource = orgs[i][17].split(',');

		rLen = offeredResource.length;
		for (j = 0; j < rLen; j++) {
			text += "<li>" + offeredResource[j] + "</li>";

		}

		text += "</ul>";
		text += "</div> </div>";

		text += "<div class=\"col-md-2\">";
		text += "<div class=\"vcenter\">";

		text += "<button id=" + orgs[i][0] + " type=\"button\" class=\"updOrgButton\" data-toggle= \"modal\" data-target=\"#updateModal\" onclick=\"populateUpdateFaiths();populateUpdateStates();loadUpdateModalData(" + orgs[i][0] + ");\">Update</button>";
		text += "<button id=" + orgs[i][0] + " type=\"button\">Delete</button>";



		text += "</div> </div> </div> </div>";

		document.getElementById("resultPanel").innerHTML = text;


	}



}

function loadComplexData() {

	var test = 1;

	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "complexSingleOrg",
			orgId: test
		},
		success: function(data) {
			console.log(data);
			var parsedData = JSON.parse(data);
			var org = parsedData;

			/* insert text here */



		}
	});


}

function insertOrganization() {

	/**Organization Table Insert Data **/

	var orgName = document.getElementById("txtOrgNameCreate").value;
	var agencyName = document.getElementById("txtOrgProgramCreate").value;
	var missionStmt = document.getElementById("txtMissionStatementCreate").value;
	var weblink = document.getElementById("txtOrgWebsiteCreate").value;
	var email = document.getElementById("txtOrgEmailCreate").value;
	var phoneNum = document.getElementById("txtMainPhoneCreate").value;
	var phoneExt = document.getElementById("txtMainPhoneExtCreate").value;
	var hotlineNum = document.getElementById("txtHotlineCreate").value;
	var confNum = document.getElementById("txtConfPhoneCreate").value;
	var confExt = document.getElementById("txtConfPhoneExtCreate").value;
	var isShelter = document.getElementById("cbShelterCreate").checked;
	var isTransHousing = document.getElementById("cbTransitionalHousingCreate").checked;
	var isAsstLoc = document.getElementById("cbAssistLocateHousingCreate").checked;
	var fee = 0;
	var faith = document.getElementById("ddlFaithCreate").value;
	var notes = document.getElementById("txtNoteCreate").value;
	var confNotes = document.getElementById("txtConfidentialNoteCreate").value;
	var isConf = document.getElementById("cbIsConfCreate").checked;

	if (document.getElementById("cbFreeCreate").checked == true) {
		var fee = 0;
	}
	else {
		var fee = document.getElementById("txtAssociatedFeeCreate").value;
	}

	/**Addresses Table Insert Data**/
	var streetInfo1 = document.getElementById("txtAddress1StreetCreate").value;
	var city1 = document.getElementById("txtAddress1CityCreate").value;
	var zipcode1 = document.getElementById("txtAddress1ZipCreate").value;
	var county1 = document.getElementById("txtAddress1CountyCreate").value;
	var state1 = document.getElementById("ddlAddress1StateCreate").value;

	var streetInfo2 = document.getElementById("txtAddress2StreetCreate").value;
	var city2 = document.getElementById("txtAddress2CityCreate").value;
	var zipcode2 = document.getElementById("txtAddress2ZipCreate").value;
	var county2 = document.getElementById("txtAddress2CountyCreate").value;
	var state2 = document.getElementById("ddlAddress2StateCreate").value;

	var streetInfo3 = document.getElementById("txtConfAddressStreetCreate").value;
	var city3 = document.getElementById("txtConfAddressCityCreate").value;
	var zipcode3 = document.getElementById("txtConfAddressZipCreate").value;
	var county3 = document.getElementById("txtConfAddressCountyCreate").value;
	var state3 = document.getElementById("ddlConfAddressStateCreate").value;


	/**Age Table Insert Data**/
	var infantsAge = document.getElementById("cbInfantCreate").checked;
	var childrenAge = document.getElementById("cbChildCreate").checked;
	var youthAge = document.getElementById("cbYouthCreate").checked;
	var adultsAge = document.getElementById("cbAdultCreate").checked;

	/**Contact Table Insert Data**/
	var contactEmail = document.getElementById("txtPrimaryContactEmailCreate").value;
	var firstName = document.getElementById("txtPrimaryContactFirstNameCreate").value;
	var lastName = document.getElementById("txtPrimaryContactLastNameCreate").value;
	var position = document.getElementById("txtPrimaryContactPosCreate").value;
	var contactPhoneNum = document.getElementById("txtPrimaryContactPhoneCreate").value;
	var contactPhoneExt = document.getElementById("txtPrimaryContactExtCreate").value;
	var contactIsConf = document.getElementById("cbContactIsConfCreate").checked;

	/**Ethnicity Table Insert Data**/
	var hispanic = document.getElementById("cbHispanicCreate").checked;
	var nonhispanic = document.getElementById("cbNonHispanicCreate").checked;

	/**Gender Table Insert Data**/
	var male = document.getElementById("cbMaleCreate").checked;
	var female = document.getElementById("cbFemaleCreate").checked;
	var transgender = document.getElementById("cbTransCreate").checked;

	/**Hours Table Insert Data**/
	var is24Hours = document.getElementById("cbIs247Create").checked;

	var mondayToFridayFullOpen = document.getElementById("ddlGenFullWeekStartTimeCreate").value;
	var mondayToFridayFullClose = document.getElementById("ddlGenFullWeekEndTimeCreate").value;
	var saturdayFullOpen = document.getElementById("ddlGenFullWeekSatStartTimeCreate").value;
	var saturdayFullClose = document.getElementById("ddlGenFullWeekSatEndTimeCreate").value;
	var sundayFullOpen = document.getElementById("ddlGenFullWeekSunStartTimeCreate").value;
	var sundayFullClose = document.getElementById("ddlGenFullWeekSunEndTimeCreate").value;
	var mondaySingleOpen = document.getElementById("ddlGenMondayStartTimeCreate").value;
	var mondaySingleClose = document.getElementById("ddlGenMondayEndTimeCreate").value;
	var tuesdaySingleOpen = document.getElementById("ddlGenTuesdayStartTimeCreate").value;
	var tuesdaySingleClose = document.getElementById("ddlGenTuesdayEndTimeCreate").value;
	var wednesdaySingleOpen = document.getElementById("ddlGenWednesdayStartTimeCreate").value;
	var wednesdaySingleClose = document.getElementById("ddlGenWednesdayEndTimeCreate").value;
	var thursdaySingleOpen = document.getElementById("ddlGenThursdayStartTimeCreate").value;
	var thursdaySingleClose = document.getElementById("ddlGenThursdayEndTimeCreate").value;
	var fridaySingleOpen = document.getElementById("ddlGenFridayStartTimeCreate").value;
	var fridaySingleClose = document.getElementById("ddlGenFridayEndTimeCreate").value;
	var saturdaySingleOpen = document.getElementById("ddlGenSaturdayStartTimeCreate").value;
	var saturdaySingleClose = document.getElementById("ddlGenSaturdayEndTimeCreate").value;
	var sundaySingleOpen = document.getElementById("ddlGenSundayStartTimeCreate").value;
	var sundaySingleClose = document.getElementById("ddlGenSundayEndTimeCreate").value;

	var mondayToFridayFullOpenAdd = document.getElementById("ddlAddFullWeekStartTimeCreate").value;
	var mondayToFridayFullCloseAdd = document.getElementById("ddlAddFullWeekEndTimeCreate").value;
	var saturdayFullOpenAdd = document.getElementById("ddlAddFullWeekSatStartTimeCreate").value;
	var saturdayFullCloseAdd = document.getElementById("ddlAddFullWeekSatEndTimeCreate").value;
	var sundayFullOpenAdd = document.getElementById("ddlAddFullWeekSunStartTimeCreate").value;
	var sundayFullCloseAdd = document.getElementById("ddlAddFullWeekSunEndTimeCreate").value;
	var mondaySingleOpenAdd = document.getElementById("ddlAddMondayStartTimeCreate").value;
	var mondaySingleCloseAdd = document.getElementById("ddlAddMondayEndTimeCreate").value;
	var tuesdaySingleOpenAdd = document.getElementById("ddlAddTuesdayStartTimeCreate").value;
	var tuesdaySingleCloseAdd = document.getElementById("ddlAddTuesdayEndTimeCreate").value;
	var wednesdaySingleOpenAdd = document.getElementById("ddlAddWednesdayStartTimeCreate").value;
	var wednesdaySingleCloseAdd = document.getElementById("ddlAddWednesdayEndTimeCreate").value;
	var thursdaySingleOpenAdd = document.getElementById("ddlAddThursdayStartTimeCreate").value;
	var thursdaySingleCloseAdd = document.getElementById("ddlAddThursdayEndTimeCreate").value;
	var fridaySingleOpenAdd = document.getElementById("ddlAddFridayStartTimeCreate").value;
	var fridaySingleCloseAdd = document.getElementById("ddlAddFridayEndTimeCreate").value;
	var saturdaySingleOpenAdd = document.getElementById("ddlAddSaturdayStartTimeCreate").value;
	var saturdaySingleCloseAdd = document.getElementById("ddlAddSaturdayEndTimeCreate").value;
	var sundaySingleOpenAdd = document.getElementById("ddlAddSundayStartTimeCreate").value;
	var sundaySingleCloseAdd = document.getElementById("ddlAddSundayEndTimeCreate").value;
	var addHoursDesc = document.getElementById("txtAddHoursDescCreate").value;


	/**Nationality Table Insert Data **/
	var domesticBorn = document.getElementById("cbDomesticCreate").checked;
	var foreignBorn = document.getElementById("cbForeignCreate").checked;
	var undocumented = document.getElementById("cbUndocumentedCreate").checked;

	/**Race Table Insert Data **/
	var white = document.getElementById("cbWhiteCreate").checked;
	var black = document.getElementById("cbBlackCreate").checked;
	var asian = document.getElementById("cbAsianCreate").checked;
	var hawaiian = document.getElementById("cbIslandCreate").checked;
	var native = document.getElementById("cbNativeCreate").checked;

	/**Requirements Table Insert Data **/
	var membership = document.getElementById("cbMembershipCreate").checked;
	var membershipDesc = document.getElementById("txtMembershipCreate").value;
	var training = document.getElementById("cbTrainingCreate").checked;
	var trainingDesc = document.getElementById("txtTrainingCreate").value;
	var application = document.getElementById("cbApplicationCreate").checked;
	var applicationDesc = document.getElementById("txtApplicationCreate").value;
	var waiting = document.getElementById("cbRestrictionCreate").checked;
	var waitingDesc = document.getElementById("txtRestrictionCreate").value;

	/**Service Table Insert Data **/

	var providesClothingService = document.getElementById("cbClothingServCreate").checked;
	var providesClothingSupply = document.getElementById("cbClothingSupplyCreate").checked;
	var providesClothingEmergResp = document.getElementById("cbClothingEmergRespCreate").checked;
	var providesClothingDesc = document.getElementById("txtClothingDescCreate").value;

	var providesFoodService = document.getElementById("cbFoodServCreate").checked;
	var providesFoodSupply = document.getElementById("cbFoodSupplyCreate").checked;
	var providesFoodEmergResp = document.getElementById("cbFoodEmergRespCreate").checked;
	var providesFoodDesc = document.getElementById("txtFoodDescCreate").value;

	var providesEmploymentService = document.getElementById("cbEmploymentServCreate").checked;
	var providesEmploymentSupply = document.getElementById("cbEmploymentSupplyCreate").checked;
	var providesEmploymentEmergResp = document.getElementById("cbEmploymentEmergRespCreate").checked;
	var providesEmploymentDesc = document.getElementById("txtEmploymentDescCreate").value;

	var providesMentoringService = document.getElementById("cbMentoringServCreate").checked;
	var providesMentoringSupply = document.getElementById("cbMentoringSupplyCreate").checked;
	var providesMentoringEmergResp = document.getElementById("cbMentoringEmergRespCreate").checked;
	var providesMentoringDesc = document.getElementById("txtMentoringDescCreate").value;

	var providesCounsTherapyService = document.getElementById("cbCounselServCreate").checked;
	var providesCounsTherapySupply = document.getElementById("cbCounselServCreate").checked;
	var providesCounsTherapyEmergResp = document.getElementById("cbCounselServCreate").checked;
	var providesCounsTherapyDesc = document.getElementById("txtCounselDescCreate").value;

	var providesPregnancyService = document.getElementById("cbPregnancyServCreate").checked;
	var providesPregnancySupply = document.getElementById("cbPregnancySupplyCreate").checked;
	var providesPregnancyEmergResp = document.getElementById("cbPregnancyEmergRespCreate").checked;
	var providesPregnancyDesc = document.getElementById("txtPregnancyDescCreate").value;

	var providesMedicalService = document.getElementById("cbMedicalServCreate").checked;
	var providesMedicalSupply = document.getElementById("cbMedicalSupplyCreate").checked;
	var providesMedicalEmergResp = document.getElementById("cbMedicalEmergRespCreate").checked;
	var providesMedicalDesc = document.getElementById("txtMedicalDescCreate").value;

	var providesLegalService = document.getElementById("cbLegalServCreate").checked;
	var providesLegalSupply = document.getElementById("cbLegalSupplyCreate").checked;
	var providesLegalEmergResp = document.getElementById("cbLegalEmergRespCreate").checked;
	var providesLegalDesc = document.getElementById("txtLegalDescCreate").value;

	var providesGovService = document.getElementById("cbGovServCreate").checked;
	var providesGovSupply = document.getElementById("cbGovSupplyCreate").checked;
	var providesGovEmergResp = document.getElementById("cbGovEmergRespCreate").checked;
	var providesGovDesc = document.getElementById("txtGovDescCreate").value;

	var providesInvestigationService = document.getElementById("cbInvestigationServCreate").checked;
	var providesInvestigationSupply = document.getElementById("cbInvestigationSupplyCreate").checked;
	var providesInvestigationEmergResp = document.getElementById("cbInvestigationEmergRespCreate").checked;
	var providesInvestigationDesc = document.getElementById("txtInvestigationDescCreate").value;

	var providesFosterService = document.getElementById("cbFosterServCreate").checked;
	var providesFosterSupply = document.getElementById("cbFosterSupplyCreate").checked;
	var providesFosterEmergResp = document.getElementById("cbFosterEmergRespCreate").checked;
	var providesFosterDesc = document.getElementById("txtFosterDescCreate").value;

	var providesAwarenessService = document.getElementById("cbAwarenessEdServCreate").checked;
	var providesAwarenessSupply = document.getElementById("cbAwarenessEdSupplyCreate").checked;
	var providesAwarenessEmergResp = document.getElementById("cbAwarenessEdEmergRespCreate").checked;
	var providesAwarenessDesc = document.getElementById("txtAwarenessEdDescCreate").value;

	var providesResponseTrainingService = document.getElementById("cbResponseTrainServCreate").checked;
	var providesResponseTrainingSupply = document.getElementById("cbResponseTrainSupplyCreate").checked;
	var providesResponseTrainingEmergResp = document.getElementById("cbResponseTrainEmergRespCreate").checked;
	var providesResponseTrainingDesc = document.getElementById("txtResponseTrainDescCreate").value;

	var substanceAbuseService = document.getElementById("cbSubstanceAbuseServCreate").checked;
	var substanceAbuseSupply = document.getElementById("cbSubstanceAbuseSupplyCreate").checked;
	var substanceAbuseEmergResp = document.getElementById("cbSubstanceAbuseEmergRespCreate").checked;
	var substanceAbuseDesc = document.getElementById("txtSubstanceAbuseDescCreate").value;

	var advocacyService = document.getElementById("cbAdvocacyServCreate").checked;
	var advocacySupply = document.getElementById("cbAdvocacySupplyCreate").checked;
	var advocacyEmergResp = document.getElementById("cbAdvocacyEmergRespCreate").checked;
	var advocacyDesc = document.getElementById("txtAdvocacyDescCreate").value;

	var otherService = document.getElementById("cbOtherServCreate").checked;
	var otherSupply = document.getElementById("cbOtherSupplyCreate").checked;
	var otherEmergResp = document.getElementById("cbOtherEmergRespCreate").checked;
	var otherDesc = document.getElementById("txtOtherDescCreate").value;





	console.log("simple search beginning worked")
	$.ajax({
		url: '/PHP/createOrgAjax.php',
		type: 'POST',
		data: {
			method: "insertOrganization",

			/**Organization Table Data**/

			orgName: orgName,
			agencyName: agencyName,
			missionStmt: missionStmt,
			weblink: weblink,
			email: email,
			phoneNum: phoneNum,
			phoneExt: phoneExt,
			hotlineNum: hotlineNum,
			confNum: confNum,
			confExt: confExt,
			isShelter: isShelter.toString(),
			isTransHousing: isTransHousing.toString(),
			isAsstLoc: isAsstLoc.toString(),
			fee: fee,
			faith: faith,
			notes: notes,
			confNotes: confNotes,
			isConf: isConf.toString(),

			/**Addresses Table Insert Data**/
			streetInfo1: streetInfo1,
			city1: city1,
			zipcode1: zipcode1,
			county1: county1,
			state1: state1,

			streetInfo2: streetInfo2,
			city2: city2,
			zipcode2: zipcode2,
			county2: county2,
			state2: state2,

			streetInfo3: streetInfo3,
			city3: city3,
			zipcode3: zipcode3,
			county3: county3,
			state3: state3,


			/**Age Table Insert Data**/
			infantsAge: infantsAge.toString(),
			childrenAge: childrenAge.toString(),
			youthAge: youthAge.toString(),
			adultsAge: adultsAge.toString(),

			/**Contact Table Insert Data**/
			contactEmail: contactEmail,
			firstName: firstName,
			lastName: lastName,
			position: position,
			contactPhoneNum: contactPhoneNum,
			contactPhoneExt: contactPhoneExt,
			contactIsConf: contactIsConf.toString(),

			/**Ethnicity Table Insert Data**/
			hispanic: hispanic.toString(),
			nonhispanic: nonhispanic.toString(),

			/**Gender Table Insert Data**/
			male: male.toString(),
			female: female.toString(),
			transgender: transgender.toString(),

			/**Hours Table Insert Data**/
			is24Hours: is24Hours.toString(),

			mondayToFridayFullOpen: mondayToFridayFullOpen,
			mondayToFridayFullClose: mondayToFridayFullClose,
			saturdayFullOpen: saturdayFullOpen,
			saturdayFullClose: saturdayFullClose,
			sundayFullOpen: sundayFullOpen,
			sundayFullClose: sundayFullClose,
			mondaySingleOpen: mondaySingleOpen,
			mondaySingleClose: mondaySingleClose,
			tuesdaySingleOpen: tuesdaySingleOpen,
			tuesdaySingleClose: tuesdaySingleClose,
			wednesdaySingleOpen: wednesdaySingleOpen,
			wednesdaySingleClose: wednesdaySingleClose,
			thursdaySingleOpen: thursdaySingleOpen,
			thursdaySingleClose: thursdaySingleClose,
			fridaySingleOpen: fridaySingleOpen,
			fridaySingleClose: fridaySingleClose,
			saturdaySingleOpen: saturdaySingleOpen,
			saturdaySingleClose: saturdaySingleClose,
			sundaySingleOpen: sundaySingleOpen,
			sundaySingleClose: sundaySingleClose,

			mondayToFridayFullOpenAdd: mondayToFridayFullOpenAdd,
			mondayToFridayFullCloseAdd: mondayToFridayFullCloseAdd,
			saturdayFullOpenAdd: saturdayFullOpenAdd,
			saturdayFullCloseAdd: saturdayFullCloseAdd,
			sundayFullOpenAdd: sundayFullOpenAdd,
			sundayFullCloseAdd: sundayFullOpenAdd,
			mondaySingleOpenAdd: mondaySingleOpenAdd,
			mondaySingleCloseAdd: mondaySingleCloseAdd,
			tuesdaySingleOpenAdd: tuesdaySingleOpenAdd,
			tuesdaySingleCloseAdd: tuesdaySingleCloseAdd,
			wednesdaySingleOpenAdd: wednesdaySingleOpenAdd,
			wednesdaySingleCloseAdd: wednesdaySingleCloseAdd,
			thursdaySingleOpenAdd: thursdaySingleOpenAdd,
			thursdaySingleCloseAdd: thursdaySingleCloseAdd,
			fridaySingleOpenAdd: fridaySingleOpenAdd,
			fridaySingleCloseAdd: fridaySingleCloseAdd,
			saturdaySingleOpenAdd: saturdaySingleOpenAdd,
			saturdaySingleCloseAdd: saturdaySingleCloseAdd,
			sundaySingleOpenAdd: sundaySingleOpenAdd,
			sundaySingleCloseAdd: sundaySingleCloseAdd,
			addHoursDesc: addHoursDesc,



			/**Nationality Table Insert Data **/
			domesticBorn: domesticBorn.toString(),
			foreignBorn: foreignBorn.toString(),
			undocumented: undocumented.toString(),

			/**Race Table Insert Data **/
			white: white.toString(),
			black: black.toString(),
			asian: asian.toString(),
			hawaiian: hawaiian.toString(),
			native: native.toString(),

			/**Requirements Table Insert Data **/
			membership: membership.toString(),
			membershipDesc: membershipDesc,
			training: training.toString(),
			trainingDesc: trainingDesc,
			application: application.toString(),
			applicationDesc: applicationDesc,
			waiting: waiting.toString(),
			waitingDesc: waitingDesc,

			/**Service Table Insert Data **/

			providesClothingService: providesClothingService.toString(),
			providesClothingSupply: providesClothingSupply.toString(),
			providesClothingEmergResp: providesClothingEmergResp.toString(),
			providesClothingDesc: providesClothingDesc,

			providesFoodService: providesFoodService.toString(),
			providesFoodSupply: providesFoodSupply.toString(),
			providesFoodEmergResp: providesFoodEmergResp.toString(),
			providesFoodDesc: providesFoodDesc,

			providesEmploymentService: providesEmploymentService.toString(),
			providesEmploymentSupply: providesEmploymentSupply.toString(),
			providesEmploymentEmergResp: providesEmploymentEmergResp.toString(),
			providesEmploymentDesc: providesEmploymentDesc,

			providesMentoringService: providesMentoringService.toString(),
			providesMentoringSupply: providesMentoringSupply.toString(),
			providesMentoringEmergResp: providesMentoringEmergResp.toString(),
			providesMentoringDesc: providesMentoringDesc,

			providesCounsTherapyService: providesCounsTherapyService.toString(),
			providesCounsTherapySupply: providesCounsTherapySupply.toString(),
			providesCounsTherapyEmergResp: providesCounsTherapyEmergResp.toString(),
			providesCounsTherapyDesc: providesCounsTherapyDesc,

			providesPregnancyService: providesPregnancyService.toString(),
			providesPregnancySupply: providesPregnancySupply.toString(),
			providesPregnancyEmergResp: providesPregnancyEmergResp.toString(),
			providesPregnancyDesc: providesPregnancyDesc,

			providesMedicalService: providesMedicalService.toString(),
			providesMedicalSupply: providesMedicalSupply.toString(),
			providesMedicalEmergResp: providesMedicalEmergResp.toString(),
			providesMedicalDesc: providesMedicalDesc,

			providesLegalService: providesLegalService.toString(),
			providesLegalSupply: providesLegalSupply.toString(),
			providesLegalEmergResp: providesLegalEmergResp.toString(),
			providesLegalDesc: providesLegalDesc,

			providesGovService: providesGovService.toString(),
			providesGovSupply: providesGovSupply.toString(),
			providesGovEmergResp: providesGovEmergResp.toString(),
			providesGovDesc: providesGovDesc,

			providesInvestigationService: providesInvestigationService.toString(),
			providesInvestigationSupply: providesInvestigationSupply.toString(),
			providesInvestigationEmergResp: providesInvestigationEmergResp.toString(),
			providesInvestigationDesc: providesInvestigationDesc,

			providesFosterService: providesFosterService.toString(),
			providesFosterSupply: providesFosterSupply.toString(),
			providesFosterEmergResp: providesFosterEmergResp.toString(),
			providesFosterDesc: providesFosterDesc,

			providesAwarenessService: providesAwarenessService.toString(),
			providesAwarenessSupply: providesAwarenessSupply.toString(),
			providesAwarenessEmergResp: providesAwarenessEmergResp.toString(),
			providesAwarenessDesc: providesAwarenessDesc,

			providesResponseTrainingService: providesResponseTrainingService.toString(),
			providesResponseTrainingSupply: providesResponseTrainingSupply.toString(),
			providesResponseTrainingEmergResp: providesResponseTrainingEmergResp.toString(),
			providesResponseTrainingDesc: providesResponseTrainingDesc,

			substanceAbuseService: substanceAbuseService.toString(),
			substanceAbuseSupply: substanceAbuseSupply.toString(),
			substanceAbuseEmergResp: substanceAbuseEmergResp.toString(),
			substanceAbuseDesc: substanceAbuseDesc,

			advocacyService: advocacyService.toString(),
			advocacySupply: advocacySupply.toString(),
			advocacyEmergResp: advocacyEmergResp.toString(),
			advocacyDesc: advocacyDesc,

			otherService: otherService.toString(),
			otherSupply: otherSupply.toString(),
			otherEmergResp: otherEmergResp.toString(),
			otherDesc: otherDesc
		},
		success: function(data) {
			console.log("connection to php for insert working");
			console.log(data);

		}
	});







}

function updateOrganization() {
	/**Organization Table Insert Data **/

	var orgName = document.getElementById("txtOrgNameUpdate").value;
	var agencyName = document.getElementById("txtOrgProgramUpdate").value;
	var missionStmt = document.getElementById("txtMissionStatementUpdate").value;
	var weblink = document.getElementById("txtOrgWebsiteUpdate").value;
	var email = document.getElementById("txtOrgEmailUpdate").value;
	var phoneNum = document.getElementById("txtMainPhoneUpdate").value;
	var phoneExt = document.getElementById("txtMainPhoneExtUpdate").value;
	var hotlineNum = document.getElementById("txtHotlineUpdate").value;
	var confNum = document.getElementById("txtConfPhoneUpdate").value;
	var confExt = document.getElementById("txtConfExtUpdate").value;
	var isShelter = document.getElementById("cbShelterUpdate").checked;
	var isTransHousing = document.getElementById("cbTransitionalHousingUpdate").checked;
	var isAsstLoc = document.getElementById("cbAssistLocateHousingUpdate").checked;
	var fee = 0;
	/*change to faith dropdown */
	var faith = document.getElementById("txtFaithUpdate").value;
	var notes = document.getElementById("txtNoteUpdate").value;
	var confNotes = document.getElementById("txtConfidentialNoteUpdate").value;
	var isConf = document.getElementById("cbIsConfUpdate").checked;

	if (document.getElementById("cbFreeUpdate").checked == true) {
		var fee = 0;
	}
	else {
		var fee = document.getElementById("txtAssociatedFeeUpdate").value;
	}

	/**Addresses Table Insert Data**/
	var streetInfo1 = document.getElementById("txtAddress1StreetUpdate").value;
	var city1 = document.getElementById("txtAddress1CityUpdate").value;
	var zipcode1 = document.getElementById("txtAddress1ZipUpdate").value;
	var county1 = document.getElementById("txtAddress1CountyUpdate").value;
	var state1 = document.getElementById("txtAddress1StateUpdate").value;

	var streetInfo2 = document.getElementById("txtAddress2StreetUpdate").value;
	var city2 = document.getElementById("txtAddress2CityUpdate").value;
	var zipcode2 = document.getElementById("txtAddress2ZipUpdate").value;
	var county2 = document.getElementById("txtAddress2CountyUpdate").value;
	var state2 = document.getElementById("txtAddress2StateUpdate").value;

	var streetInfo3 = document.getElementById("txtConfAddressStreetUpdate").value;
	var city3 = document.getElementById("txtConfAddressCityUpdate").value;
	var zipcode3 = document.getElementById("txtConfAddressZipUpdate").value;
	var county3 = document.getElementById("txtConfAddressCountyUpdate").value;
	var state3 = document.getElementById("txtConfAddressStateUpdate").value;


	/**Age Table Insert Data**/
	var infantsAge = document.getElementById("cbInfantUpdate").checked;
	var childrenAge = document.getElementById("cbChildUpdate").checked;
	var youthAge = document.getElementById("cbYouthUpdate").checked;
	var adultsAge = document.getElementById("cbAdultUpdate").checked;

	/**Contact Table Insert Data**/
	var contactEmail = document.getElementById("txtPrimaryContactEmailUpdate").value;
	var firstName = document.getElementById("txtPrimaryContactFirstNameUpdate").value;
	var lastName = document.getElementById("txtPrimaryContactLastNameUpdate").value;
	var position = document.getElementById("txtPrimaryContactPosUpdate").value;
	var contactPhoneNum = document.getElementById("txtPrimaryContactPhoneUpdate").value;
	var contactPhoneExt = document.getElementById("txtPrimaryContactExtUpdate").value;
	var contactIsConf = document.getElementById("cbContactIsConfUpdate").checked;

	/**Ethnicity Table Insert Data**/
	var hispanic = document.getElementById("cbHispanicUpdate").checked;
	var nonhispanic = document.getElementById("cbNonHispanicUpdate").checked;

	/**Gender Table Insert Data**/
	var male = document.getElementById("cbMaleUpdate").checked;
	var female = document.getElementById("cbFemaleUpdate").checked;
	var transgender = document.getElementById("cbTransUpdate").checked;

	/**Hours Table Insert Data**/
	var is24Hours = document.getElementById("cbIs247Update").checked;

	var mondayToFridayFullOpen = document.getElementById("ddlGenFullWeekStartTimeUpdate").value;
	var mondayToFridayFullClose = document.getElementById("ddlGenFullWeekEndTimeUpdate").value;
	var saturdayFullOpen = document.getElementById("ddlGenFullWeekSatStartTimeUpdate").value;
	var saturdayFullClose = document.getElementById("ddlGenFullWeekSatEndTimeUpdate").value;
	var sundayFullOpen = document.getElementById("ddlGenFullWeekSunStartTimeUpdate").value;
	var sundayFullClose = document.getElementById("ddlGenFullWeekSunEndTimeUpdate").value;
	var mondaySingleOpen = document.getElementById("ddlGenMondayStartTimeUpdate").value;
	var mondaySingleClose = document.getElementById("ddlGenMondayEndTimeUpdate").value;
	var tuesdaySingleOpen = document.getElementById("ddlGenTuesdayStartTimeUpdate").value;
	var tuesdaySingleClose = document.getElementById("ddlGenTuesdayEndTimeUpdate").value;
	var wednesdaySingleOpen = document.getElementById("ddlGenWednesdayStartTimeUpdate").value;
	var wednesdaySingleClose = document.getElementById("ddlGenWednesdayEndTimeUpdate").value;
	var thursdaySingleOpen = document.getElementById("ddlGenThursdayStartTimeUpdate").value;
	var thursdaySingleClose = document.getElementById("ddlGenThursdayEndTimeUpdate").value;
	var fridaySingleOpen = document.getElementById("ddlGenFridayStartTimeUpdate").value;
	var fridaySingleClose = document.getElementById("ddlGenFridayEndTimeUpdate").value;
	var saturdaySingleOpen = document.getElementById("ddlGenSaturdayStartTimeUpdate").value;
	var saturdaySingleClose = document.getElementById("ddlGenSaturdayEndTimeUpdate").value;
	var sundaySingleOpen = document.getElementById("ddlGenSundayStartTimeUpdate").value;
	var sundaySingleClose = document.getElementById("ddlGenSundayEndTimeUpdate").value;

	var mondayToFridayFullOpenAdd = document.getElementById("ddlAddFullWeekStartTimeUpdate").value;
	var mondayToFridayFullCloseAdd = document.getElementById("ddlAddFullWeekEndTimeUpdate").value;
	var saturdayFullOpenAdd = document.getElementById("ddlAddFullWeekSatStartTimeUpdate").value;
	var saturdayFullCloseAdd = document.getElementById("ddlAddFullWeekSatEndTimeUpdate").value;
	var sundayFullOpenAdd = document.getElementById("ddlAddFullWeekSunStartTimeUpdate").value;
	var sundayFullCloseAdd = document.getElementById("ddlAddFullWeekSunEndTimeUpdate").value;
	var mondaySingleOpenAdd = document.getElementById("ddlAddMondayStartTimeUpdate").value;
	var mondaySingleCloseAdd = document.getElementById("ddlAddMondayEndTimeUpdate").value;
	var tuesdaySingleOpenAdd = document.getElementById("ddlAddTuesdayStartTimeUpdate").value;
	var tuesdaySingleCloseAdd = document.getElementById("ddlAddTuesdayEndTimeUpdate").value;
	var wednesdaySingleOpenAdd = document.getElementById("ddlAddWednesdayStartTimeUpdate").value;
	var wednesdaySingleCloseAdd = document.getElementById("ddlAddWednesdayEndTimeUpdate").value;
	var thursdaySingleOpenAdd = document.getElementById("ddlAddThursdayStartTimeUpdate").value;
	var thursdaySingleCloseAdd = document.getElementById("ddlAddThursdayEndTimeUpdate").value;
	var fridaySingleOpenAdd = document.getElementById("ddlAddFridayStartTimeUpdate").value;
	var fridaySingleCloseAdd = document.getElementById("ddlAddFridayEndTimeUpdate").value;
	var saturdaySingleOpenAdd = document.getElementById("ddlAddSaturdayStartTimeUpdate").value;
	var saturdaySingleCloseAdd = document.getElementById("ddlAddSaturdayEndTimeUpdate").value;
	var sundaySingleOpenAdd = document.getElementById("ddlAddSundayStartTimeUpdate").value;
	var sundaySingleCloseAdd = document.getElementById("ddlAddSundayEndTimeUpdate").value;
	var addHoursDesc = document.getElementById("txtAddHoursDescUpdate").value;


	/**Nationality Table Insert Data **/
	var domesticBorn = document.getElementById("cbDomesticUpdate").checked;
	var foreignBorn = document.getElementById("cbForeignUpdate").checked;
	var undocumented = document.getElementById("cbUndocumentedUpdate").checked;

	/**Race Table Insert Data **/
	var white = document.getElementById("cbWhiteUpdate").checked;
	var black = document.getElementById("cbBlackUpdate").checked;
	var asian = document.getElementById("cbAsianUpdate").checked;
	var hawaiian = document.getElementById("cbIslandUpdate").checked;
	var native = document.getElementById("cbNativeUpdate").checked;

	/**Requirements Table Insert Data **/
	var membership = document.getElementById("cbMembershipUpdate").checked;
	var membershipDesc = document.getElementById("txtMembershipUpdate").value;
	var training = document.getElementById("cbTrainingUpdate").checked;
	var trainingDesc = document.getElementById("txtTrainingUpdate").value;
	var application = document.getElementById("cbApplicationUpdate").checked;
	var applicationDesc = document.getElementById("txtApplicationUpdate").value;
	var waiting = document.getElementById("cbRestrictionUpdate").checked;
	var waitingDesc = document.getElementById("txtRestrictionUpdate").value;

	/**Service Table Insert Data **/

	var providesClothingService = document.getElementById("cbClothingServUpdate").checked;
	var providesClothingSupply = document.getElementById("cbClothingSupplyUpdate").checked;
	var providesClothingEmergResp = document.getElementById("cbClothingEmergRespUpdate").checked;
	var providesClothingDesc = document.getElementById("txtClothingDescUpdate").value;

	var providesFoodService = document.getElementById("cbFoodServUpdate").checked;
	var providesFoodSupply = document.getElementById("cbFoodSupplyUpdate").checked;
	var providesFoodEmergResp = document.getElementById("cbFoodEmergRespUpdate").checked;
	var providesFoodDesc = document.getElementById("txtFoodDescUpdate").value;

	var providesEmploymentService = document.getElementById("cbEmploymentServUpdate").checked;
	var providesEmploymentSupply = document.getElementById("cbEmploymentSupplyUpdate").checked;
	var providesEmploymentEmergResp = document.getElementById("cbEmploymentEmergRespUpdate").checked;
	var providesEmploymentDesc = document.getElementById("txtEmploymentDescUpdate").value;

	var providesMentoringService = document.getElementById("cbMentoringServUpdate").checked;
	var providesMentoringSupply = document.getElementById("cbMentoringSupplyUpdate").checked;
	var providesMentoringEmergResp = document.getElementById("cbMentoringEmergRespUpdate").checked;
	var providesMentoringDesc = document.getElementById("txtMentoringDescUpdate").value;

	var providesCounsTherapyService = document.getElementById("cbCounselServUpdate").checked;
	var providesCounsTherapySupply = document.getElementById("cbCounselServUpdate").checked;
	var providesCounsTherapyEmergResp = document.getElementById("cbCounselServUpdate").checked;
	var providesCounsTherapyDesc = document.getElementById("txtCounselDescUpdate").value;

	var providesPregnancyService = document.getElementById("cbPregnancyServUpdate").checked;
	var providesPregnancySupply = document.getElementById("cbPregnancySupplyUpdate").checked;
	var providesPregnancyEmergResp = document.getElementById("cbPregnancyEmergRespUpdate").checked;
	var providesPregnancyDesc = document.getElementById("txtPregnancyDescUpdate").value;

	var providesMedicalService = document.getElementById("cbMedicalServUpdate").checked;
	var providesMedicalSupply = document.getElementById("cbMedicalSupplyUpdate").checked;
	var providesMedicalEmergResp = document.getElementById("cbMedicalEmergRespUpdate").checked;
	var providesMedicalDesc = document.getElementById("txtMedicalDescUpdate").value;

	var providesLegalService = document.getElementById("cbLegalServUpdate").checked;
	var providesLegalSupply = document.getElementById("cbLegalSupplyUpdate").checked;
	var providesLegalEmergResp = document.getElementById("cbLegalEmergRespUpdate").checked;
	var providesLegalDesc = document.getElementById("txtLegalDescUpdate").value;

	var providesGovService = document.getElementById("cbGovServUpdate").checked;
	var providesGovSupply = document.getElementById("cbGovSupplyUpdate").checked;
	var providesGovEmergResp = document.getElementById("cbGovEmergRespUpdate").checked;
	var providesGovDesc = document.getElementById("txtGovDescUpdate").value;

	var providesInvestigationService = document.getElementById("cbInvestigationServUpdate").checked;
	var providesInvestigationSupply = document.getElementById("cbInvestigationSupplyUpdate").checked;
	var providesInvestigationEmergResp = document.getElementById("cbInvestigationEmergRespUpdate").checked;
	var providesInvestigationDesc = document.getElementById("txtInvestigationDescUpdate").value;

	var providesFosterService = document.getElementById("cbFosterServUpdate").checked;
	var providesFosterSupply = document.getElementById("cbFosterSupplyUpdate").checked;
	var providesFosterEmergResp = document.getElementById("cbFosterEmergRespUpdate").checked;
	var providesFosterDesc = document.getElementById("txtFosterDescUpdate").value;

	var providesAwarenessService = document.getElementById("cbAwarenessEdServUpdate").checked;
	var providesAwarenessSupply = document.getElementById("cbAwarenessEdSupplyUpdate").checked;
	var providesAwarenessEmergResp = document.getElementById("cbAwarenessEdEmergRespUpdate").checked;
	var providesAwarenessDesc = document.getElementById("txtAwarenessEdDescUpdate").value;

	var providesResponseTrainingService = document.getElementById("cbResponseTrainServUpdate").checked;
	var providesResponseTrainingSupply = document.getElementById("cbResponseTrainSupplyUpdate").checked;
	var providesResponseTrainingEmergResp = document.getElementById("cbResponseTrainEmergRespUpdate").checked;
	var providesResponseTrainingDesc = document.getElementById("txtResponseTrainDescUpdate").value;

	var substanceAbuseService = document.getElementById("cbSubstanceAbuseServUpdate").checked;
	var substanceAbuseSupply = document.getElementById("cbSubstanceAbuseSupplyUpdate").checked;
	var substanceAbuseEmergResp = document.getElementById("cbSubstanceAbuseEmergRespUpdate").checked;
	var substanceAbuseDesc = document.getElementById("txtSubstanceAbuseDescUpdate").value;

	var advocacyService = document.getElementById("cbAdvocacyServUpdate").checked;
	var advocacySupply = document.getElementById("cbAdvocacySupplyUpdate").checked;
	var advocacyEmergResp = document.getElementById("cbAdvocacyEmergRespUpdate").checked;
	var advocacyDesc = document.getElementById("txtAdvocacyDescUpdate").value;

	var otherService = document.getElementById("cbOtherServUpdate").checked;
	var otherSupply = document.getElementById("cbOtherSupplyUpdate").checked;
	var otherEmergResp = document.getElementById("cbOtherEmergRespUpdate").checked;
	var otherDesc = document.getElementById("txtOtherDescUpdate").value;





	console.log("simple search beginning worked")
	$.ajax({
		url: '/PHP/updateOrgAjax.php',
		type: 'POST',
		data: {
			method: "updateOrganization",

			/**Organization Table Data**/

			orgName: orgName,
			agencyName: agencyName,
			missionStmt: missionStmt,
			weblink: weblink,
			email: email,
			phoneNum: phoneNum,
			phoneExt: phoneExt,
			hotlineNum: hotlineNum,
			confNum: confNum,
			confExt: confExt,
			isShelter: isShelter.toString(),
			isTransHousing: isTransHousing.toString(),
			isAsstLoc: isAsstLoc.toString(),
			fee: fee,
			faith: faith,
			notes: notes,
			confNotes: confNotes,
			isConf: isConf.toString(),

			/**Addresses Table Insert Data**/
			streetInfo1: streetInfo1,
			city1: city1,
			zipcode1: zipcode1,
			county1: county1,
			state1: state1,

			streetInfo2: streetInfo2,
			city2: city2,
			zipcode2: zipcode2,
			county2: county2,
			state2: state2,

			streetInfo3: streetInfo3,
			city3: city3,
			zipcode3: zipcode3,
			county3: county3,
			state3: state3,


			/**Age Table Insert Data**/
			infantsAge: infantsAge.toString(),
			childrenAge: childrenAge.toString(),
			youthAge: youthAge.toString(),
			adultsAge: adultsAge.toString(),

			/**Contact Table Insert Data**/
			contactEmail: contactEmail,
			firstName: firstName,
			lastName: lastName,
			position: position,
			contactPhoneNum: contactPhoneNum,
			contactPhoneExt: contactPhoneExt,
			contactIsConf: contactIsConf.toString(),

			/**Ethnicity Table Insert Data**/
			hispanic: hispanic.toString(),
			nonhispanic: nonhispanic.toString(),

			/**Gender Table Insert Data**/
			male: male.toString(),
			female: female.toString(),
			transgender: transgender.toString(),

			/**Hours Table Insert Data**/
			is24Hours: is24Hours.toString(),

			mondayToFridayFullOpen: mondayToFridayFullOpen,
			mondayToFridayFullClose: mondayToFridayFullClose,
			saturdayFullOpen: saturdayFullOpen,
			saturdayFullClose: saturdayFullClose,
			sundayFullOpen: sundayFullOpen,
			sundayFullClose: sundayFullClose,
			mondaySingleOpen: mondaySingleOpen,
			mondaySingleClose: mondaySingleClose,
			tuesdaySingleOpen: tuesdaySingleOpen,
			tuesdaySingleClose: tuesdaySingleClose,
			wednesdaySingleOpen: wednesdaySingleOpen,
			wednesdaySingleClose: wednesdaySingleClose,
			thursdaySingleOpen: thursdaySingleOpen,
			thursdaySingleClose: thursdaySingleClose,
			fridaySingleOpen: fridaySingleOpen,
			fridaySingleClose: fridaySingleClose,
			saturdaySingleOpen: saturdaySingleOpen,
			saturdaySingleClose: saturdaySingleClose,
			sundaySingleOpen: sundaySingleOpen,
			sundaySingleClose: sundaySingleClose,

			mondayToFridayFullOpenAdd: mondayToFridayFullOpenAdd,
			mondayToFridayFullCloseAdd: mondayToFridayFullCloseAdd,
			saturdayFullOpenAdd: saturdayFullOpenAdd,
			saturdayFullCloseAdd: saturdayFullCloseAdd,
			sundayFullOpenAdd: sundayFullOpenAdd,
			sundayFullCloseAdd: sundayFullOpenAdd,
			mondaySingleOpenAdd: mondaySingleOpenAdd,
			mondaySingleCloseAdd: mondaySingleCloseAdd,
			tuesdaySingleOpenAdd: tuesdaySingleOpenAdd,
			tuesdaySingleCloseAdd: tuesdaySingleCloseAdd,
			wednesdaySingleOpenAdd: wednesdaySingleOpenAdd,
			wednesdaySingleCloseAdd: wednesdaySingleCloseAdd,
			thursdaySingleOpenAdd: thursdaySingleOpenAdd,
			thursdaySingleCloseAdd: thursdaySingleCloseAdd,
			fridaySingleOpenAdd: fridaySingleOpenAdd,
			fridaySingleCloseAdd: fridaySingleCloseAdd,
			saturdaySingleOpenAdd: saturdaySingleOpenAdd,
			saturdaySingleCloseAdd: saturdaySingleCloseAdd,
			sundaySingleOpenAdd: sundaySingleOpenAdd,
			sundaySingleCloseAdd: sundaySingleCloseAdd,
			addHoursDesc: addHoursDesc,



			/**Nationality Table Insert Data **/
			domesticBorn: domesticBorn.toString(),
			foreignBorn: foreignBorn.toString(),
			undocumented: undocumented.toString(),

			/**Race Table Insert Data **/
			white: white.toString(),
			black: black.toString(),
			asian: asian.toString(),
			hawaiian: hawaiian.toString(),
			native: native.toString(),

			/**Requirements Table Insert Data **/
			membership: membership.toString(),
			membershipDesc: membershipDesc,
			training: training.toString(),
			trainingDesc: trainingDesc,
			application: application.toString(),
			applicationDesc: applicationDesc,
			waiting: waiting.toString(),
			waitingDesc: waitingDesc,

			/**Service Table Insert Data **/

			providesClothingService: providesClothingService.toString(),
			providesClothingSupply: providesClothingSupply.toString(),
			providesClothingEmergResp: providesClothingEmergResp.toString(),
			providesClothingDesc: providesClothingDesc,

			providesFoodService: providesFoodService.toString(),
			providesFoodSupply: providesFoodSupply.toString(),
			providesFoodEmergResp: providesFoodEmergResp.toString(),
			providesFoodDesc: providesFoodDesc,

			providesEmploymentService: providesEmploymentService.toString(),
			providesEmploymentSupply: providesEmploymentSupply.toString(),
			providesEmploymentEmergResp: providesEmploymentEmergResp.toString(),
			providesEmploymentDesc: providesEmploymentDesc,

			providesMentoringService: providesMentoringService.toString(),
			providesMentoringSupply: providesMentoringSupply.toString(),
			providesMentoringEmergResp: providesMentoringEmergResp.toString(),
			providesMentoringDesc: providesMentoringDesc,

			providesCounsTherapyService: providesCounsTherapyService.toString(),
			providesCounsTherapySupply: providesCounsTherapySupply.toString(),
			providesCounsTherapyEmergResp: providesCounsTherapyEmergResp.toString(),
			providesCounsTherapyDesc: providesCounsTherapyDesc,

			providesPregnancyService: providesPregnancyService.toString(),
			providesPregnancySupply: providesPregnancySupply.toString(),
			providesPregnancyEmergResp: providesPregnancyEmergResp.toString(),
			providesPregnancyDesc: providesPregnancyDesc,

			providesMedicalService: providesMedicalService.toString(),
			providesMedicalSupply: providesMedicalSupply.toString(),
			providesMedicalEmergResp: providesMedicalEmergResp.toString(),
			providesMedicalDesc: providesMedicalDesc,

			providesLegalService: providesLegalService.toString(),
			providesLegalSupply: providesLegalSupply.toString(),
			providesLegalEmergResp: providesLegalEmergResp.toString(),
			providesLegalDesc: providesLegalDesc,

			providesGovService: providesGovService.toString(),
			providesGovSupply: providesGovSupply.toString(),
			providesGovEmergResp: providesGovEmergResp.toString(),
			providesGovDesc: providesGovDesc,

			providesInvestigationService: providesInvestigationService.toString(),
			providesInvestigationSupply: providesInvestigationSupply.toString(),
			providesInvestigationEmergResp: providesInvestigationEmergResp.toString(),
			providesInvestigationDesc: providesInvestigationDesc,

			providesFosterService: providesFosterService.toString(),
			providesFosterSupply: providesFosterSupply.toString(),
			providesFosterEmergResp: providesFosterEmergResp.toString(),
			providesFosterDesc: providesFosterDesc,

			providesAwarenessService: providesAwarenessService.toString(),
			providesAwarenessSupply: providesAwarenessSupply.toString(),
			providesAwarenessEmergResp: providesAwarenessEmergResp.toString(),
			providesAwarenessDesc: providesAwarenessDesc,

			providesResponseTrainingService: providesResponseTrainingService.toString(),
			providesResponseTrainingSupply: providesResponseTrainingSupply.toString(),
			providesResponseTrainingEmergResp: providesResponseTrainingEmergResp.toString(),
			providesResponseTrainingDesc: providesResponseTrainingDesc,

			substanceAbuseService: substanceAbuseService.toString(),
			substanceAbuseSupply: substanceAbuseSupply.toString(),
			substanceAbuseEmergResp: substanceAbuseEmergResp.toString(),
			substanceAbuseDesc: substanceAbuseDesc,

			advocacyService: advocacyService.toString(),
			advocacySupply: advocacySupply.toString(),
			advocacyEmergResp: advocacyEmergResp.toString(),
			advocacyDesc: advocacyDesc,

			otherService: otherService.toString(),
			otherSupply: otherSupply.toString(),
			otherEmergResp: otherEmergResp.toString(),
			otherDesc: otherDesc
		},
		success: function(data) {
			console.log("connection to php for insert working");
			console.log(data);

		}
	});







}

function populateCreateStates() {
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "getStates"
		},
		success: function(data) {
			var parsedData = JSON.parse(data);
			var states = parsedData;

			$("#ddlAddress1StateCreate").get(0).options.length = 0;
			$("#ddlAddress2StateCreate").get(0).options.length = 0;
			$("#ddlConfAddressStateCreate").get(0).options.length = 0;

			for (i = 0; i < states.length; i++) {
				$('<option/>').val(states[i]).html(states[i]).appendTo("#ddlAddress1StateCreate");
				$('<option/>').val(states[i]).html(states[i]).appendTo("#ddlAddress2StateCreate");
				$('<option/>').val(states[i]).html(states[i]).appendTo("#ddlConfAddressStateCreate");
			}
		}
	});
}

function populateCreateFaiths() {
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "getFaiths"
		},
		success: function(data) {
			var parsedData = JSON.parse(data);
			var faiths = parsedData;

			$("#ddlFaithCreate").get(0).options.length = 0;

			for (i = 0; i < faiths.length; i++) {
				$('<option/>').val(faiths[i]).html(faiths[i]).appendTo("#ddlFaithCreate");
			}
		}
	});
}

function populateUpdateStates() {
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "getStates"
		},
		success: function(data) {
			var parsedData = JSON.parse(data);
			var states = parsedData;

			$("#ddlAddress1StateUpdate").get(0).options.length = 0;
			$("#ddlAddress2StateUpdate").get(0).options.length = 0;
			$("#ddlConfAddressStateUpdate").get(0).options.length = 0;

			for (i = 0; i < states.length; i++) {
				$('<option/>').val(states[i]).html(states[i]).appendTo("#ddlAddress1StateUpdate");
				$('<option/>').val(states[i]).html(states[i]).appendTo("#ddlAddress2StateUpdate");
				$('<option/>').val(states[i]).html(states[i]).appendTo("#ddlConfAddressStateUpdate");
			}
		}
	});
}

function populateUpdateFaiths() {
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "getFaiths"
		},
		success: function(data) {
			var parsedData = JSON.parse(data);
			var faiths = parsedData;

			$("#ddlFaithUpdate").get(0).options.length = 0;

			for (i = 0; i < faiths.length; i++) {
				$('<option/>').val(faiths[i]).html(faiths[i]).appendTo("#ddlFaithUpdate");
			}
		}
	});
}

function loadUpdateModalData(orgId) {

	/*load addresses table*/
	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getAddressUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("addresses: " + data);
			var parsedData = JSON.parse(data);
			var addresses = parsedData;
			
					document.getElementById("txtConfAddressStreetUpdate").value = "";
					document.getElementById("txtConfAddressCityUpdate").value = "";
					document.getElementById("txtConfAddressZipUpdate").value = "";
					document.getElementById("txtConfAddressCountyUpdate").value = "";
					document.getElementById("ddlConfAddressStateUpdate").value = "";
					
					document.getElementById("txtAddress2StreetUpdate").value = "";
					document.getElementById("txtAddress2CityUpdate").value = "";
					document.getElementById("txtAddress2ZipUpdate").value = "";
					document.getElementById("txtAddress2CountyUpdate").value = ""; 
					document.getElementById("ddlAddress2StateUpdate").value = "";
						
					document.getElementById("txtAddress1StreetUpdate").value = "";
					document.getElementById("txtAddress1CityUpdate").value = "";
					document.getElementById("txtAddress1ZipUpdate").value = "";
					document.getElementById("txtAddress1CountyUpdate").value = "";
					document.getElementById("ddlAddress1StateUpdate").value = "";
					
					
			
			aLen = addresses.length;
			var lastStreet = "xxx";
			for (i = 0; i < aLen; i++) {
				if(addresses[i][5] == 1) {
					document.getElementById("txtConfAddressStreetUpdate").value = addresses[i][0];
					document.getElementById("txtConfAddressCityUpdate").value = addresses[i][1];
					document.getElementById("txtConfAddressZipUpdate").value = addresses[i][2];
					document.getElementById("txtConfAddressCountyUpdate").value = addresses[i][3];
					document.getElementById("ddlConfAddressStateUpdate").value = addresses[i][4];
				}
				else {
					if(document.getElementById("txtAddress1StreetUpdate").value == lastStreet) {
						document.getElementById("txtAddress2StreetUpdate").value = addresses[i][0];
						document.getElementById("txtAddress2CityUpdate").value = addresses[i][1];
						document.getElementById("txtAddress2ZipUpdate").value = addresses[i][2];
						document.getElementById("txtAddress2CountyUpdate").value = addresses[i][3];
						document.getElementById("ddlAddress2StateUpdate").value = addresses[i][4];
					}
					else{
						document.getElementById("txtAddress1StreetUpdate").value = addresses[i][0];
						document.getElementById("txtAddress1CityUpdate").value = addresses[i][1];
						document.getElementById("txtAddress1ZipUpdate").value = addresses[i][2];
						document.getElementById("txtAddress1CountyUpdate").value = addresses[i][3];
						document.getElementById("ddlAddress1StateUpdate").value = addresses[i][4];
					}
				}
				lastStreet = addresses[i][0];
			
			}
			
		}
	});

	/*load age table */

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getAgeUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("ages: " + data);
			var parsedData = JSON.parse(data);
			var ages = parsedData;
			
				document.getElementById("cbAgeAllUpdate").checked = false;
				document.getElementById("cbInfantUpdate").checked = false;
				document.getElementById("cbChildUpdate").checked = false;
				document.getElementById("cbYouthUpdate").checked = false;
				document.getElementById("cbAdultUpdate").checked = false;
				document.getElementById("cbInfantUpdate").disabled = false;
				document.getElementById("cbChildUpdate").disabled = false;
				document.getElementById("cbYouthUpdate").disabled = false;
				document.getElementById("cbAdultUpdate").disabled = false;
				
				aLen = ages.length;
				
				for (i = 0; i < aLen; i++) { 
					if (ages[i][0] == "All") {
						document.getElementById("cbAgeAllUpdate").checked = true;
						document.getElementById("cbInfantUpdate").checked = true;
						document.getElementById("cbChildUpdate").checked = true;
						document.getElementById("cbYouthUpdate").checked = true;
						document.getElementById("cbAdultUpdate").checked = true;
						document.getElementById("cbInfantUpdate").disabled = true;
						document.getElementById("cbChildUpdate").disabled = true;
						document.getElementById("cbYouthUpdate").disabled = true;
						document.getElementById("cbAdultUpdate").disabled = true;
					}
					else {
						if(ages[i][0] == "Infants/Toddlers") {
							document.getElementById("cbInfantUpdate").checked = true;
						}
						if(ages[i][0] == "Children") {
							document.getElementById("cbChildUpdate").checked = true;
						}
						if(ages[i][0] == "Youth/Young Adults") {
							document.getElementById("cbYouthUpdate").checked = true;
						}
						if(ages[i][0] == "Adults") {
							document.getElementById("cbAdultUpdate").checked = true;
						}
					}
				}
				

		}
	}); 

	/*load contacts table

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getContactsUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("contacts: " + data);
			var parsedData = JSON.parse(data);
			var contacts = parsedData;
		}
	}); */

	/*load ethnicity table

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getEthnicityUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("ethnicity: " + data);
			var parsedData = JSON.parse(data);
			var ethnicities = parsedData;
		}
	}); */

	/*load gender table 

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getGenderUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("gender: " + data);
			var parsedData = JSON.parse(data);
			var genders = parsedData;
		}
	}); */

	/*load hours table

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getHoursUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("hours: " + data);
			var parsedData = JSON.parse(data);
			var hours = parsedData;
		}
	}); */

	/*load nationality table 

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getNationalityUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("nationality: " + data);
			var parsedData = JSON.parse(data);
			var nationalityData = parsedData;
						
			for (i; i < nationalityData.length; i++){
				if (nationalityData[i] == "ALL") {
					document.getElementById("cbNatAllUpdate").checked = true;
					document.getElementById("cbDomesticUpdate").checked = true;
					document.getElementById("cbForeignUpdate").checked = true;
					document.getElementById("cbUndocumentedUpdate").checked = true;
					break;
				}
				
				if (nationality[i] == "Domestic-Born") {
					document.getElementById("cbDomesticUpdate").checked = true;
				}
				
				if (nationality[i] == "Foreign-Born") {
					document.getElementById("cbForeignUpdate").checked = true;
				}
				
				if (nationality[i] == "Undocumented") {
					document.getElementById("cbUndocumentedUpdate").checked = true;
				}
			}
		} 
	}); */

	/*load organizations table */
/*	
	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getOrganizationUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("organizations: " + data);
			var parsedData = JSON.parse(data);
			var organizationData = parsedData;
			
			if (organizationData[16] == 1) {
				document.getElementById("CBIsConfUpdate").checked = true;
			}
			else {
				document.getElementById("CBIsConfUpdate").checked = false;
			}
			
			document.getElementById("txtOrgNameUpdate").value = organizationData[1];
			document.getElementById("txtOrgProgramUpdate").value = organizationData[18];
			document.getElementById("txtMissionStatementUpdate").value = organizationData[3];
			document.getElementById("txtOrgWebsiteUpdate").value = organizationData[4];
			document.getElementById("txtOrgEmailUpdate").value = organizationData[5];
			document.getElementById("txtMainPhoneUpdate").value = organizationData[6];   
			document.getElementById("txtHotlineUpdate").value = organizationData[7];
			document.getElementById("txtConfPhoneUpdate").value = organizationData[8];   
			
			if (organizationData[9] == 1) {
				document.getElementById("cbShelterUpdate").checked = true;
			}
			else {
				document.getElementById("cbShelterUpdate").checked = false;
			}
			
			if (organizationData[10] == 1) {
				document.getElementById("cbTransitionalHousingUpdate").checked = true;
			}
			else {
				document.getElementById("cbTransitionalHousingUpdate").checked = false;
			}
			
			if (organizationData[11] == 1) {
				document.getElementById("cbAssistLocateHousingUpdate").checked = true;
			}
			else {
				document.getElementById("cbAssistLocateHousingUpdate").checked = false;
			}
			
			document.getElementById("txtAssociatedFeeUpdate").value = organizationData[12];
			document.getElementById("ddlFaithUpdate").value = organizationData[13];
			document.getElementById("txtNoteUpdate").value = organizationData[14];
			document.getElementById("txtConfidentialNoteUpdate").value = organizationData[15];
			document.getElementById("txtMainPhoneExtUpdate").value = organizationData[19];
			document.getElementById("txtConfExtUpdate").value = organizationData[20];
		}
	}); 
*/
	/*load race table

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getRaceUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("race: " + data);
			var parsedData = JSON.parse(data);
			var raceData = parsedData;
			
			for (i; i < raceData.length; i++){
				if (raceData[i] == "ALL") {
					document.getElementById("cbRaceAllUpdate").checked = true;
					document.getElementById("cbWhiteUpdate").checked = true;
					document.getElementById("cbBlackUpdate").checked = true;
					document.getElementById("cbAsianUpdate").checked = true;
					document.getElementById("cbIslandUpdate").checked = true;
					document.getElementById("cbNativeUpdate").checked = true;
					break;
				}
				
				if (nationality[i] == "White") {
					document.getElementById("cbWhiteUpdate").checked = true;
				}
				
				if (nationality[i] == "Black or African American") {
					document.getElementById("cbBlackUpdate").checked = true;
				}
				
				if (nationality[i] == "Asian") {
					document.getElementById("cbAsianUpdate").checked = true;
				}
				if (nationality[i] == "Native Hawaiian or Other Pacific Islander") {
					document.getElementById("cbIslandUpdate").checked = true;
				}
				if (nationality[i] == "American Indian or Alaska Native") {
					document.getElementById("cbNativeUpdate").checked = true;
				}
			}
		}
	}); */

	/* load requirements table */
/*
	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getRequirementsUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("requirements: " + data);
			var parsedData = JSON.parse(data);
			var requirementsData = parsedData;
			
			for (i = 0; i < requirementsData.length; i++) {
				
				if (requirementsData[i][0] == "Membership") {
					document.getElementById("cbMembershipUpdate").checked = true;
					document.getElementById("txtMembershipUpdate").value = requirementsData[i][1];
				}
				
				if (requirementsData[i][0] == "Training") {
					document.getElementById("cbTrainingUpdate").checked = true;
					document.getElementById("txtTrainingUpdate").value = requirementsData[i][1];
				}
				
				if (requirementsData[i][0] == "Application") {
					document.getElementById("cbApplicationUpdate").checked = true;
					document.getElementById("txtApplicationUpdate").value = requirementsData[i][1];
				}
				
				if (requirementsData[i][0] == "Possible Waiting List/Referral Required/Other Entry Restrictions") {
					document.getElementById("cbRestrictionUpdate").checked = true;
					document.getElementById("txtRestrictionUpdate").value = requirementsData[i][1];
				}
			}
		}
	}); 
*/
	/* load service table */
	
		$.ajax({
			url: '/PHP/loadUpdateData.php',
			type: 'POST',
			data: {
				method: "getServiceUpdateData",
				orgId: orgId
			},
			success: function(data) {
				console.log("service: " + data);
				var parsedData = JSON.parse(data);
				var serviceData = parsedData;
				
				for (i = 0; i < serviceData.length; i++) {
					
					if (serviceData[i][1] == "Clothing") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							
							document.getElementById("cbClothingAllUpdate").checked = true;
							document.getElementById("cbClothingServUpdate").checked = true;
							document.getElementById("cbClothingSupplyUpdate").checked = true;
							document.getElementById("cbClothingEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbClothingServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbClothingSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbClothingEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtClothingDescUpdate").value = serviceData[i][5];
						}
						
					}
					
					if (serviceData[i][1] == "Food") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
						
							document.getElementById("cbFoodAllUpdate").checked = true;
							document.getElementById("cbFoodServUpdate").checked = true;
							document.getElementById("cbFoodSupplyUpdate").checked = true;
							document.getElementById("cbFoodEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbFoodServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbFoodSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbFoodEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtFoodDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Employment") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							
							document.getElementById("cbEmploymentAllUpdate").checked = true;
							document.getElementById("cbEmploymentServUpdate").checked = true;
							document.getElementById("cbEmploymentSupplyUpdate").checked = true;
							document.getElementById("cbEmploymentEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbEmploymentServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbEmploymentSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbEmploymentEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtEmploymentDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Mentoring") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							
							document.getElementById("cbMentoringAllUpdate").checked = true;
							document.getElementById("cbMentoringServUpdate").checked = true;
							document.getElementById("cbMentoringSupplyUpdate").checked = true;
							document.getElementById("cbMentoringEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbMentoringServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbMentoringSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbMentoringEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtMentoringDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Counseling/Therapy") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbCounselAllUpdate").checked = true;
							document.getElementById("cbCounselServUpdate").checked = true;
							document.getElementById("cbCounselSupplyUpdate").checked = true;
							document.getElementById("cbCounselEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbCounselServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbCounselSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbCounselEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtCounselDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Pregnancy") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbPregnancyAllUpdate").checked = true;
							document.getElementById("cbPregnancyServUpdate").checked = true;
							document.getElementById("cbPregnancySupplyUpdate").checked = true;
							document.getElementById("cbPregnancyEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbPregnancyServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbPregnancySupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbPregnancyEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtPregnancyDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Medical") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbMedicalAllUpdate").checked = true;
							document.getElementById("cbMedicalServUpdate").checked = true;
							document.getElementById("cbMedicalSupplyUpdate").checked = true;
							document.getElementById("cbMedicalEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbMedicalServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbMedicalSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbMedicalEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtMedicalDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Legal") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbLegalAllUpdate").checked = true;
							document.getElementById("cbLegalServUpdate").checked = true;
							document.getElementById("cbLegalSupplyUpdate").checked = true;
							document.getElementById("cbLegalEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbLegalServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbLegalSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbLegalEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtLegalDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Governmental") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbGovAllUpdate").checked = true;
							document.getElementById("cbGovServUpdate").checked = true;
							document.getElementById("cbGovSupplyUpdate").checked = true;
							document.getElementById("cbGovEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbGovServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbGovSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbGovEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtGovDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Investigation") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbInvestigationAllUpdate").checked = true;
							document.getElementById("cbInvestigationServUpdate").checked = true;
							document.getElementById("cbInvestigationSupplyUpdate").checked = true;
							document.getElementById("cbInvestigationEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbInvestigationServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbInvestigationSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbInvestigationEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtInvestigationDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Foster Care") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbFosterAllUpdate").checked = true;
							document.getElementById("cbFosterServUpdate").checked = true;
							document.getElementById("cbFosterSupplyUpdate").checked = true;
							document.getElementById("cbFosterEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbFosterServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbFosterSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbFosterEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtFosterDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Awareness/Education") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbAwarenessEdAllUpdate").checked = true;
							document.getElementById("cbAwarenessEdServUpdate").checked = true;
							document.getElementById("cbAwarenessEdSupplyUpdate").checked = true;
							document.getElementById("cbAwarenessEdEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbAwarenessEdServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbAwarenessEdSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbAwarenessEdEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtAwarenessEdDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Response Training") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbResponseTrainAllUpdate").checked = true;
							document.getElementById("cbResponseTrainServUpdate").checked = true;
							document.getElementById("cbResponseTrainSupplyUpdate").checked = true;
							document.getElementById("cbResponseTrainEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbResponseTrainServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbResponseTrainSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbResponseTrainEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtResponseTrainDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Substance Abuse") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbSubstanceAbuseAllUpdate").checked = true;
							document.getElementById("cbSubstanceAbuseServUpdate").checked = true;
							document.getElementById("cbSubstanceAbuseSupplyUpdate").checked = true;
							document.getElementById("cbSubstanceAbuseEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbSubstanceAbuseServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbSubstanceAbuseSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbSubstanceAbuseEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtSubstanceAbuseDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Other") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbOtherAllUpdate").checked = true;
							document.getElementById("cbOtherServUpdate").checked = true;
							document.getElementById("cbOtherSupplyUpdate").checked = true;
							document.getElementById("cbOtherEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbOtherServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbOtherSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbOtherEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtOtherDescUpdate").value = serviceData[i][5];
						}
					}
					
					if (serviceData[i][1] == "Advocacy") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							document.getElementById("cbAdvocacyAllUpdate").checked = true;
							document.getElementById("cbAdvocacyServUpdate").checked = true;
							document.getElementById("cbAdvocacySupplyUpdate").checked = true;
							document.getElementById("cbAdvocacyEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbAdvocacServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbAdvocacSupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbAdvocacEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtAdvocacDescUpdate").value = serviceData[i][5];
						}
					}
				}
			}
		});  
}

function checkHoursCreate() {
	$("#cbIs247Create").click(function() {
		if ($(this).is(":checked")) 
		{
			$("#ddlGenFullWeekStartTimeCreate").prop("disabled", true);
			$("#ddlGenFullWeekStartTimeCreate").prop("disabled", true);
			$("#ddlGenFullWeekEndTimeCreate").prop("disabled", true);
			$("#ddlGenFullWeekSatStartTimeCreate").prop("disabled", true);
			$("#ddlGenFullWeekSatEndTimeCreate").prop("disabled", true);
			$("#ddlGenFullWeekSunStartTimeCreate").prop("disabled", true);
			$("#ddlGenFullWeekSunEndTimeCreate").prop("disabled", true);
			$("#ddlGenMondayStartTimeCreate").prop("disabled", true);
			$("#ddlGenMondayEndTimeCreate").prop("disabled", true);
			$("#ddlGenTuesdayStartTimeCreate").prop("disabled", true);
			$("#ddlGenTuesdayEndTimeCreate").prop("disabled", true);
			$("#ddlGenWednesdayStartTimeCreate").prop("disabled", true);
			$("#ddlGenWednesdayEndTimeCreate").prop("disabled", true);
			$("#ddlGenThursdayStartTimeCreate").prop("disabled", true);
			$("#ddlGenThursdayEndTimeCreate").prop("disabled", true);
			$("#ddlGenFridayStartTimeCreate").prop("disabled", true);
			$("#ddlGenFridayEndTimeCreate").prop("disabled", true);
			$("#ddlGenSaturdayStartTimeCreate").prop("disabled", true);
			$("#ddlGenSaturdayEndTimeCreate").prop("disabled", true);
			$("#ddlGenSundayStartTimeCreate").prop("disabled", true);
			$("#ddlGenSundayEndTimeCreate").prop("disabled", true);

			$("#ddlAddFullWeekStartTimeCreate").prop("disabled", true);
			$("#ddlAddFullWeekEndTimeCreate").prop("disabled", true);
			$("#ddlAddFullWeekSatStartTimeCreate").prop("disabled", true);
			$("#ddlAddFullWeekSatEndTimeCreate").prop("disabled", true);
			$("#ddlAddFullWeekSunStartTimeCreate").prop("disabled", true);
			$("#ddlAddFullWeekSunEndTimeCreate").prop("disabled", true);
			$("#ddlAddMondayStartTimeCreate").prop("disabled", true);
			$("#ddlAddMondayEndTimeCreate").prop("disabled", true);
			$("#ddlAddTuesdayStartTimeCreate").prop("disabled", true);
			$("#ddlAddTuesdayEndTimeCreate").prop("disabled", true);
			$("#ddlAddWednesdayStartTimeCreate").prop("disabled", true);
			$("#ddlAddWednesdayEndTimeCreate").prop("disabled", true);
			$("#ddlAddThursdayStartTimeCreate").prop("disabled", true);
			$("#ddlAddThursdayEndTimeCreate").prop("disabled", true);
			$("#ddlAddFridayStartTimeCreate").prop("disabled", true);
			$("#ddlAddFridayEndTimeCreate").prop("disabled", true);
			$("#ddlAddSaturdayStartTimeCreate").prop("disabled", true);
			$("#ddlAddSaturdayEndTimeCreate").prop("disabled", true);
			$("#ddlAddSundayStartTimeCreate").prop("disabled", true);
			$("#ddlAddSundayEndTimeCreate").prop("disabled", true);
		}
		else {
			$("#ddlGenFullWeekStartTimeCreate").prop("disabled", false);
			$("#ddlGenFullWeekStartTimeCreate").prop("disabled", false);
			$("#ddlGenFullWeekEndTimeCreate").prop("disabled", false);
			$("#ddlGenFullWeekSatStartTimeCreate").prop("disabled", false);
			$("#ddlGenFullWeekSatEndTimeCreate").prop("disabled", false);
			$("#ddlGenFullWeekSunStartTimeCreate").prop("disabled", false);
			$("#ddlGenFullWeekSunEndTimeCreate").prop("disabled", false);
			$("#ddlGenMondayStartTimeCreate").prop("disabled", false);
			$("#ddlGenMondayEndTimeCreate").prop("disabled", false);
			$("#ddlGenTuesdayStartTimeCreate").prop("disabled", false);
			$("#ddlGenTuesdayEndTimeCreate").prop("disabled", false);
			$("#ddlGenWednesdayStartTimeCreate").prop("disabled", false);
			$("#ddlGenWednesdayEndTimeCreate").prop("disabled", false);
			$("#ddlGenThursdayStartTimeCreate").prop("disabled", false);
			$("#ddlGenThursdayEndTimeCreate").prop("disabled", false);
			$("#ddlGenFridayStartTimeCreate").prop("disabled", false);
			$("#ddlGenFridayEndTimeCreate").prop("disabled", false);
			$("#ddlGenSaturdayStartTimeCreate").prop("disabled", false);
			$("#ddlGenSaturdayEndTimeCreate").prop("disabled", false);
			$("#ddlGenSundayStartTimeCreate").prop("disabled", false);
			$("#ddlGenSundayEndTimeCreate").prop("disabled", false);

			$("#ddlAddFullWeekStartTimeCreate").prop("disabled", false);
			$("#ddlAddFullWeekEndTimeCreate").prop("disabled", false);
			$("#ddlAddFullWeekSatStartTimeCreate").prop("disabled", false);
			$("#ddlAddFullWeekSatEndTimeCreate").prop("disabled", false);
			$("#ddlAddFullWeekSunStartTimeCreate").prop("disabled", false);
			$("#ddlAddFullWeekSunEndTimeCreate").prop("disabled", false);
			$("#ddlAddMondayStartTimeCreate").prop("disabled", false);
			$("#ddlAddMondayEndTimeCreate").prop("disabled", false);
			$("#ddlAddTuesdayStartTimeCreate").prop("disabled", false);
			$("#ddlAddTuesdayEndTimeCreate").prop("disabled", false);
			$("#ddlAddWednesdayStartTimeCreate").prop("disabled", false);
			$("#ddlAddWednesdayEndTimeCreate").prop("disabled", false);
			$("#ddlAddThursdayStartTimeCreate").prop("disabled", false);
			$("#ddlAddThursdayEndTimeCreate").prop("disabled", false);
			$("#ddlAddFridayStartTimeCreate").prop("disabled", false);
			$("#ddlAddFridayEndTimeCreate").prop("disabled", false);
			$("#ddlAddSaturdayStartTimeCreate").prop("disabled", false);
			$("#ddlAddSaturdayEndTimeCreate").prop("disabled", false);
			$("#ddlAddSundayStartTimeCreate").prop("disabled", false);
			$("#ddlAddSundayEndTimeCreate").prop("disabled", false);
		}
	});
}

function checkHoursUpdate() {
	$("#cbIs247Update").click(function() {
		if ($(this).is(":checked")) 
		{
			$("#ddlGenFullWeekStartTimeUpdate").prop("disabled", true);
			$("#ddlGenFullWeekStartTimeUpdate").prop("disabled", true);
			$("#ddlGenFullWeekEndTimeUpdate").prop("disabled", true);
			$("#ddlGenFullWeekSatStartTimeUpdate").prop("disabled", true);
			$("#ddlGenFullWeekSatEndTimeUpdate").prop("disabled", true);
			$("#ddlGenFullWeekSunStartTimeUpdate").prop("disabled", true);
			$("#ddlGenFullWeekSunEndTimeUpdate").prop("disabled", true);
			$("#ddlGenMondayStartTimeUpdate").prop("disabled", true);
			$("#ddlGenMondayEndTimeUpdate").prop("disabled", true);
			$("#ddlGenTuesdayStartTimeUpdate").prop("disabled", true);
			$("#ddlGenTuesdayEndTimeUpdate").prop("disabled", true);
			$("#ddlGenWednesdayStartTimeUpdate").prop("disabled", true);
			$("#ddlGenWednesdayEndTimeUpdate").prop("disabled", true);
			$("#ddlGenThursdayStartTimeUpdate").prop("disabled", true);
			$("#ddlGenThursdayEndTimeUpdate").prop("disabled", true);
			$("#ddlGenFridayStartTimeUpdate").prop("disabled", true);
			$("#ddlGenFridayEndTimeUpdate").prop("disabled", true);
			$("#ddlGenSaturdayStartTimeUpdate").prop("disabled", true);
			$("#ddlGenSaturdayEndTimeUpdate").prop("disabled", true);
			$("#ddlGenSundayStartTimeUpdate").prop("disabled", true);
			$("#ddlGenSundayEndTimeUpdate").prop("disabled", true);

			$("#ddlAddFullWeekStartTimeUpdate").prop("disabled", true);
			$("#ddlAddFullWeekEndTimeUpdate").prop("disabled", true);
			$("#ddlAddFullWeekSatStartTimeUpdate").prop("disabled", true);
			$("#ddlAddFullWeekSatEndTimeUpdate").prop("disabled", true);
			$("#ddlAddFullWeekSunStartTimeUpdate").prop("disabled", true);
			$("#ddlAddFullWeekSunEndTimeUpdate").prop("disabled", true);
			$("#ddlAddMondayStartTimeUpdate").prop("disabled", true);
			$("#ddlAddMondayEndTimeUpdate").prop("disabled", true);
			$("#ddlAddTuesdayStartTimeUpdate").prop("disabled", true);
			$("#ddlAddTuesdayEndTimeUpdate").prop("disabled", true);
			$("#ddlAddWednesdayStartTimeUpdate").prop("disabled", true);
			$("#ddlAddWednesdayEndTimeUpdate").prop("disabled", true);
			$("#ddlAddThursdayStartTimeUpdate").prop("disabled", true);
			$("#ddlAddThursdayEndTimeUpdate").prop("disabled", true);
			$("#ddlAddFridayStartTimeUpdate").prop("disabled", true);
			$("#ddlAddFridayEndTimeUpdate").prop("disabled", true);
			$("#ddlAddSaturdayStartTimeUpdate").prop("disabled", true);
			$("#ddlAddSaturdayEndTimeUpdate").prop("disabled", true);
			$("#ddlAddSundayStartTimeUpdate").prop("disabled", true);
			$("#ddlAddSundayEndTimeUpdate").prop("disabled", true);
		}
		else {
			$("#ddlGenFullWeekStartTimeUpdate").prop("disabled", false);
			$("#ddlGenFullWeekStartTimeUpdate").prop("disabled", false);
			$("#ddlGenFullWeekEndTimeUpdate").prop("disabled", false);
			$("#ddlGenFullWeekSatStartTimeUpdate").prop("disabled", false);
			$("#ddlGenFullWeekSatEndTimeUpdate").prop("disabled", false);
			$("#ddlGenFullWeekSunStartTimeUpdate").prop("disabled", false);
			$("#ddlGenFullWeekSunEndTimeUpdate").prop("disabled", false);
			$("#ddlGenMondayStartTimeUpdate").prop("disabled", false);
			$("#ddlGenMondayEndTimeUpdate").prop("disabled", false);
			$("#ddlGenTuesdayStartTimeUpdate").prop("disabled", false);
			$("#ddlGenTuesdayEndTimeUpdate").prop("disabled", false);
			$("#ddlGenWednesdayStartTimeUpdate").prop("disabled", false);
			$("#ddlGenWednesdayEndTimeUpdate").prop("disabled", false);
			$("#ddlGenThursdayStartTimeUpdate").prop("disabled", false);
			$("#ddlGenThursdayEndTimeUpdate").prop("disabled", false);
			$("#ddlGenFridayStartTimeUpdate").prop("disabled", false);
			$("#ddlGenFridayEndTimeUpdate").prop("disabled", false);
			$("#ddlGenSaturdayStartTimeUpdate").prop("disabled", false);
			$("#ddlGenSaturdayEndTimeUpdate").prop("disabled", false);
			$("#ddlGenSundayStartTimeUpdate").prop("disabled", false);
			$("#ddlGenSundayEndTimeUpdate").prop("disabled", false);

			$("#ddlAddFullWeekStartTimeUpdate").prop("disabled", false);
			$("#ddlAddFullWeekEndTimeUpdate").prop("disabled", false);
			$("#ddlAddFullWeekSatStartTimeUpdate").prop("disabled", false);
			$("#ddlAddFullWeekSatEndTimeUpdate").prop("disabled", false);
			$("#ddlAddFullWeekSunStartTimeUpdate").prop("disabled", false);
			$("#ddlAddFullWeekSunEndTimeUpdate").prop("disabled", false);
			$("#ddlAddMondayStartTimeUpdate").prop("disabled", false);
			$("#ddlAddMondayEndTimeUpdate").prop("disabled", false);
			$("#ddlAddTuesdayStartTimeUpdate").prop("disabled", false);
			$("#ddlAddTuesdayEndTimeUpdate").prop("disabled", false);
			$("#ddlAddWednesdayStartTimeUpdate").prop("disabled", false);
			$("#ddlAddWednesdayEndTimeUpdate").prop("disabled", false);
			$("#ddlAddThursdayStartTimeUpdate").prop("disabled", false);
			$("#ddlAddThursdayEndTimeUpdate").prop("disabled", false);
			$("#ddlAddFridayStartTimeUpdate").prop("disabled", false);
			$("#ddlAddFridayEndTimeUpdate").prop("disabled", false);
			$("#ddlAddSaturdayStartTimeUpdate").prop("disabled", false);
			$("#ddlAddSaturdayEndTimeUpdate").prop("disabled", false);
			$("#ddlAddSundayStartTimeUpdate").prop("disabled", false);
			$("#ddlAddSundayEndTimeUpdate").prop("disabled", false);
		}
	});
}

function checkAllDisableCreate() {
	
	$("#cbHousingAllCreate").click(function(){
        if(this.checked){
            $("#cbShelterCreate").prop('checked', true).prop('disabled', true);
            $("#cbTransitionalHousingCreate").prop('checked', true).prop('disabled', true);
            $("#cbAssistLocateHousingCreate").prop('checked', true).prop('disabled', true);
            
        }
        else{
           $("#cbShelterCreate").prop('disabled',false).prop('checked', false);
           $("#cbTransitionalHousingCreate").prop('disabled',false).prop('checked', false);
           $("#cbAssistLocateHousingCreate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbClothingAllCreate").click(function(){
        if(this.checked){
            $("#cbClothingServCreate").prop('checked', true).prop('disabled', true);
            $("#cbClothingSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbClothingEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbClothingServCreate").prop('disabled',false).prop('checked', false);
           $("#cbClothingSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbClothingEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbFoodAllCreate").click(function(){
        if(this.checked){
            $("#cbFoodServCreate").prop('checked', true).prop('disabled', true);
            $("#cbFoodSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbFoodEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbFoodServCreate").prop('disabled',false).prop('checked', false);
           $("#cbFoodSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbFoodEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbMentoringAllCreate").click(function(){
        if(this.checked){
            $("#cbMentoringServCreate").prop('checked', true).prop('disabled', true);
            $("#cbMentoringSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbMentoringEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbMentoringServCreate").prop('disabled',false).prop('checked', false);
           $("#cbMentoringSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbMentoringEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbEmploymentAllCreate").click(function(){
        if(this.checked){
            $("#cbEmploymentServCreate").prop('checked', true).prop('disabled', true);
            $("#cbEmploymentSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbEmploymentEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbEmploymentServCreate").prop('disabled',false).prop('checked', false);
           $("#cbEmploymentSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbEmploymentEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbCounselAllCreate").click(function(){
        if(this.checked){
            $("#cbCounselServCreate").prop('checked', true).prop('disabled', true);
            $("#cbCounselSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbCounselEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbCounselServCreate").prop('disabled',false).prop('checked', false);
           $("#cbCounselSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbCounselEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbPregnancyAllCreate").click(function(){
        if(this.checked){
            $("#cbPregnancyServCreate").prop('checked', true).prop('disabled', true);
            $("#cbPregnancySupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbPregnancyEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbPregnancyServCreate").prop('disabled',false).prop('checked', false);
           $("#cbPregnancySupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbPregnancyEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbMedicalAllCreate").click(function(){
        if(this.checked){
            $("#cbMedicalServCreate").prop('checked', true).prop('disabled', true);
            $("#cbMedicalSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbMedicalEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbMedicalServCreate").prop('disabled',false).prop('checked', false);
           $("#cbMedicalSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbMedicalEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbLegalAllCreate").click(function(){
        if(this.checked){
            $("#cbLegalServCreate").prop('checked', true).prop('disabled', true);
            $("#cbLegalSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbLegalEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbLegalServCreate").prop('disabled',false).prop('checked', false);
           $("#cbLegalSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbLegalEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbGovAllCreate").click(function(){
        if(this.checked){
            $("#cbGovServCreate").prop('checked', true).prop('disabled', true);
            $("#cbGovSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbGovEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbGovServCreate").prop('disabled',false).prop('checked', false);
           $("#cbGovSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbGovEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbInvestigationAllCreate").click(function(){
        if(this.checked){
            $("#cbInvestigationServCreate").prop('checked', true).prop('disabled', true);
            $("#cbInvestigationSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbInvestigationEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbInvestigationServCreate").prop('disabled',false).prop('checked', false);
           $("#cbInvestigationSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbInvestigationEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbFosterAllCreate").click(function(){
        if(this.checked){
            $("#cbFosterServCreate").prop('checked', true).prop('disabled', true);
            $("#cbFosterSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbFosterEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbFosterServCreate").prop('disabled',false).prop('checked', false);
           $("#cbFosterSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbFosterEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbAwarenessAllCreate").click(function(){
        if(this.checked){
            $("#cbAwarenessEdServCreate").prop('checked', true).prop('disabled', true);
            $("#cbAwarenessEdSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbAwarenessEdEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbAwarenessEdServCreate").prop('disabled',false).prop('checked', false);
           $("#cbAwarenessEdSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbAwarenessEdEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbResponseTrainAllCreate").click(function(){
        if(this.checked){
            $("#cbResponseTrainServCreate").prop('checked', true).prop('disabled', true);
            $("#cbResponseTrainSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbResponseTrainEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbResponseTrainServCreate").prop('disabled',false).prop('checked', false);
           $("#cbResponseTrainSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbResponseTrainEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbSubstanceAbuseAllCreate").click(function(){
        if(this.checked){
            $("#cbSubstanceAbuseServCreate").prop('checked', true).prop('disabled', true);
            $("#cbSubstanceAbuseSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbSubstanceAbuseEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbSubstanceAbuseServCreate").prop('disabled',false).prop('checked', false);
           $("#cbSubstanceAbuseSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbSubstanceAbuseEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbAdvocacyAllCreate").click(function(){
        if(this.checked){
            $("#cbAdvocacyServCreate").prop('checked', true).prop('disabled', true);
            $("#cbAdvocacySupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbAdvocacyEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbAdvocacyServCreate").prop('disabled',false).prop('checked', false);
           $("#cbAdvocacySupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbAdvocacyEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbOtherAllCreate").click(function(){
        if(this.checked){
            $("#cbOtherServCreate").prop('checked', true).prop('disabled', true);
            $("#cbOtherSupplyCreate").prop('checked', true).prop('disabled', true);
            $("#cbOtherEmergRespCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbOtherServCreate").prop('disabled',false).prop('checked', false);
           $("#cbOtherSupplyCreate").prop('disabled',false).prop('checked', false);
           $("#cbOtherEmergRespCreate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbGenderAllCreate").click(function(){
        if(this.checked){
            $("#cbMaleCreate").prop('checked', true).prop('disabled', true);
            $("#cbFemaleCreate").prop('checked', true).prop('disabled', true);
            $("#cbTransCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbMaleCreate").prop('disabled',false).prop('checked', false);
           $("#cbFemaleCreate").prop('disabled',false).prop('checked', false);
           $("#cbTransCreate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbAgeAllCreate").click(function(){
        if(this.checked){
            $("#cbInfantCreate").prop('checked', true).prop('disabled', true);
            $("#cbChildCreate").prop('checked', true).prop('disabled', true);
            $("#cbYouthCreate").prop('checked', true).prop('disabled', true);
            $("#cbAdultCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbInfantCreate").prop('disabled',false).prop('checked', false);
           $("#cbChildCreate").prop('disabled',false).prop('checked', false);
           $("#cbYouthCreate").prop('disabled',false).prop('checked', false);
           $("#cbAdultCreate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbNatAllCreate").click(function(){
        if(this.checked){
            $("#cbDomesticCreate").prop('checked', true).prop('disabled', true);
            $("#cbForeignCreate").prop('checked', true).prop('disabled', true);
            $("#cbUndocumentedCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbDomesticCreate").prop('disabled',false).prop('checked', false);
           $("#cbForeignCreate").prop('disabled',false).prop('checked', false);
           $("#cbUndocumentedCreate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbRaceAllCreate").click(function(){
        if(this.checked){
            $("#cbWhiteCreate").prop('checked', true).prop('disabled', true);
            $("#cbBlackCreate").prop('checked', true).prop('disabled', true);
            $("#cbAsianCreate").prop('checked', true).prop('disabled', true);
            $("#cbIslandCreate").prop('checked', true).prop('disabled', true);
            $("#cbNativeCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbWhiteCreate").prop('disabled',false).prop('checked', false);
           $("#cbBlackCreate").prop('disabled',false).prop('checked', false);
           $("#cbAsianCreate").prop('disabled',false).prop('checked', false);
           $("#cbIslandCreate").prop('disabled',false).prop('checked', false);
           $("#cbNativeCreate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbEthnicityAllCreate").click(function(){
        if(this.checked){
            $("#cbHispanicCreate").prop('checked', true).prop('disabled', true);
            $("#cbNonHispanicCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbHispanicCreate").prop('disabled',false).prop('checked', false);
           $("#cbNonHispanicCreate").prop('disabled',false).prop('checked', false);
        }
    });
}

function checkAllDisableUpdate() {
	$("#cbHousingAllUpdate").click(function(){
        if(this.checked){
            $("#cbShelterUpdate").prop('checked', true).prop('disabled', true);
            $("#cbTransitionalHousingUpdate").prop('checked', true).prop('disabled', true);
            $("#cbAssistLocateHousingUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbShelterUpdate").prop('disabled',false).prop('checked', false);
           $("#cbTransitionalHousingUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAssistLocateHousingUpdate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbClothingAllUpdate").click(function(){
        if(this.checked){
            $("#cbClothingServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbClothingSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbClothingEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbClothingServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbClothingSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbClothingEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbFoodAllUpdate").click(function(){
        if(this.checked){
            $("#cbFoodServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbFoodSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbFoodEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbFoodServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbFoodSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbFoodEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbMentoringAllUpdate").click(function(){
        if(this.checked){
            $("#cbMentoringServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbMentoringSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbMentoringEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbMentoringServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbMentoringSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbMentoringEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbEmploymentAllUpdate").click(function(){
        if(this.checked){
            $("#cbEmploymentServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbEmploymentSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbEmploymentEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbEmploymentServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbEmploymentSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbEmploymentEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbCounselAllUpdate").click(function(){
        if(this.checked){
            $("#cbCounselServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbCounselSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbCounselEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbCounselServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbCounselSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbCounselEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbPregnancyAllUpdate").click(function(){
        if(this.checked){
            $("#cbPregnancyServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbPregnancySupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbPregnancyEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbPregnancyServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbPregnancySupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbPregnancyEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbMedicalAllUpdate").click(function(){
        if(this.checked){
            $("#cbMedicalServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbMedicalSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbMedicalEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbMedicalServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbMedicalSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbMedicalEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbLegalAllUpdate").click(function(){
        if(this.checked){
            $("#cbLegalServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbLegalSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbLegalEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbLegalServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbLegalSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbLegalEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbGovAllUpdate").click(function(){
        if(this.checked){
            $("#cbGovServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbGovSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbGovEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbGovServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbGovSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbGovEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbInvestigationAllUpdate").click(function(){
        if(this.checked){
            $("#cbInvestigationServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbInvestigationSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbInvestigationEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbInvestigationServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbInvestigationSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbInvestigationEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbFosterAllUpdate").click(function(){
        if(this.checked){
            $("#cbFosterServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbFosterSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbFosterEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbFosterServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbFosterSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbFosterEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbAwarenessAllUpdate").click(function(){
        if(this.checked){
            $("#cbAwarenessEdServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbAwarenessEdSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbAwarenessEdEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbAwarenessEdServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAwarenessEdSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAwarenessEdEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbResponseTrainAllUpdate").click(function(){
        if(this.checked){
            $("#cbResponseTrainServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbResponseTrainSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbResponseTrainEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbResponseTrainServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbResponseTrainSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbResponseTrainEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbSubstanceAbuseAllUpdate").click(function(){
        if(this.checked){
            $("#cbSubstanceAbuseServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbSubstanceAbuseSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbSubstanceAbuseEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbSubstanceAbuseServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbSubstanceAbuseSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbSubstanceAbuseEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });

	$("#cbAdvocacyAllUpdate").click(function(){
        if(this.checked){
            $("#cbAdvocacyServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbAdvocacySupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbAdvocacyEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbAdvocacyServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAdvocacySupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAdvocacyEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbOtherAllUpdate").click(function(){
        if(this.checked){
            $("#cbOtherServUpdate").prop('checked', true).prop('disabled', true);
            $("#cbOtherSupplyUpdate").prop('checked', true).prop('disabled', true);
            $("#cbOtherEmergRespUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbOtherServUpdate").prop('disabled',false).prop('checked', false);
           $("#cbOtherSupplyUpdate").prop('disabled',false).prop('checked', false);
           $("#cbOtherEmergRespUpdate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbGenderAllUpdate").click(function(){
        if(this.checked){
            $("#cbMaleUpdate").prop('checked', true).prop('disabled', true);
            $("#cbFemaleUpdate").prop('checked', true).prop('disabled', true);
            $("#cbTransUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbMaleUpdate").prop('disabled',false).prop('checked', false);
           $("#cbFemaleUpdate").prop('disabled',false).prop('checked', false);
           $("#cbTransUpdate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbAgeAllUpdate").click(function(){
        if(this.checked){
            $("#cbInfantUpdate").prop('checked', true).prop('disabled', true);
            $("#cbChildUpdate").prop('checked', true).prop('disabled', true);
            $("#cbYouthUpdate").prop('checked', true).prop('disabled', true);
            $("#cbAdultUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbInfantUpdate").prop('disabled',false).prop('checked', false);
           $("#cbChildUpdate").prop('disabled',false).prop('checked', false);
           $("#cbYouthUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAdultUpdate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbNatAllUpdate").click(function(){
        if(this.checked){
            $("#cbDomesticUpdate").prop('checked', true).prop('disabled', true);
            $("#cbForeignUpdate").prop('checked', true).prop('disabled', true);
            $("#cbUndocumentedUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbDomesticUpdate").prop('disabled',false).prop('checked', false);
           $("#cbForeignUpdate").prop('disabled',false).prop('checked', false);
           $("#cbUndocumentedUpdate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbRaceAllUpdate").click(function(){
        if(this.checked){
            $("#cbWhiteUpdate").prop('checked', true).prop('disabled', true);
            $("#cbBlackUpdate").prop('checked', true).prop('disabled', true);
            $("#cbAsianUpdate").prop('checked', true).prop('disabled', true);
            $("#cbIslandUpdate").prop('checked', true).prop('disabled', true);
            $("#cbNativeUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbWhiteUpdate").prop('disabled',false).prop('checked', false);
           $("#cbBlackUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAsianUpdate").prop('disabled',false).prop('checked', false);
           $("#cbIslandUpdate").prop('disabled',false).prop('checked', false);
           $("#cbNativeUpdate").prop('disabled',false).prop('checked', false);
        }
    });
    
    $("#cbEthnicityAllUpdate").click(function(){
        if(this.checked){
            $("#cbHispanicUpdate").prop('checked', true).prop('disabled', true);
            $("#cbNonHispanicUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbHispanicUpdate").prop('disabled',false).prop('checked', false);
           $("#cbNonHispanicUpdate").prop('disabled',false).prop('checked', false);
        }
    });
}

function disableFee(){
	$("#cbFreeCreate").click(function(){
		if(this.checked){
			$("#txtAssociatedFeeCreate").prop('disabled',true);
		}	
		else{
			$("#txtAssociatedFeeCreate").prop('disabled',false);
		}
	});
	
	$("#cbFreeUpdate").click(function(){
		if(this.checked){
			$("#txtAssociatedFeeUpdate").prop('disabled',true);
		}	
		else{
			$("#txtAssociatedFeeUpdatee").prop('disabled',false);
		}
	});
}

function displayUpdateModal() {
	$.ajax({
  url: '/HTML/Modals/updateModal.html',
  dataType: 'text',
  success: function(data) {
	document.getElementById("insertUpdateModal").innerHTML = data;
  }
});
}

function displayCreateModal() {
	$.ajax({
  url: '/HTML/Modals/createModal.html',
  dataType: 'text',
  success: function(data) {
	document.getElementById("insertCreateModal").innerHTML = data;
  }
});
}

function displayLoginModal() {
	$.ajax({
  url: '/HTML/Modals/loginModal.html',
  dataType: 'text',
  success: function(data) {
	document.getElementById("insertLoginModal").innerHTML = data;
  }
});
}

function onLoadFunctions() {
	displayCreateModal();
	displayUpdateModal();
	displayLoginModal();
	disableFee();
	checkAllDisableCreate();
	checkAllDisableUpdate();
	checkHoursCreate();
	checkHoursUpdate();
	populateCreateStates();
	populateCreateFaiths();
	populateUpdateStates();
	populateUpdateFaiths();
}

function getComplexData(orgId) {

	var addresses;
	var ages;
	var contacts;
	var ethnicities;
	var genders;
	var hours;
	var nationalities;
	var organizations;
	var races;
	var requirements;
	var services;
	var stateName;
	
	/*load addresses table*/
	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getAddressUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("addresses: " + data);
			var parsedData = JSON.parse(data);
			addresses = parsedData;
			
		
		}
	});

	/*load age table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getAgeUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("ages: " + data);
			var parsedData = JSON.parse(data);
			ages = parsedData;
		}
	});

	/*load contacts table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getContactsUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("contacts: " + data);
			var parsedData = JSON.parse(data);
			contacts = parsedData;
		}
	});

	/*load ethnicity table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getEthnicityUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("ethnicity: " + data);
			var parsedData = JSON.parse(data);
			ethnicities = parsedData;
		}
	});

	/*load gender table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getGenderUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("gender: " + data);
			var parsedData = JSON.parse(data);
			genders = parsedData;
		}
	});

	/*load hours table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getHoursUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("hours: " + data);
			var parsedData = JSON.parse(data);
			hours = parsedData;
		}
	});

	/*load nationality table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getNationalityUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("nationality: " + data);
			var parsedData = JSON.parse(data);
			nationalities = parsedData;
						
		} 
	});

	/*load organizations table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getOrganizationUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("organizations: " + data);
			var parsedData = JSON.parse(data);
			organizations = parsedData;
			
			

		}
	});

	/*load race table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getRaceUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("race: " + data);
			var parsedData = JSON.parse(data);
			races = parsedData;

			

		}
	});

	/*load requirements table*/

	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getRequirementsUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("requirements: " + data);
			var parsedData = JSON.parse(data);
			requirements = parsedData;
		}
	});

	/*load service table*/
	
	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getServiceUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("service: " + data);
			var parsedData = JSON.parse(data);
			services = parsedData;

			}
		}); 
		
	/*load the state name*/
	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getStateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("state: " + data);
			var parsedData = JSON.parse(data);
			stateName = parsedData;

			}
		});
	
	//setComplexData(addresses, ages, etc...);
	
}


function setComplexData(addresses, ages, contacts, ethnicities, genders, hours, nationalities, organizations, races, requirements, services, stateName){
	
	text = "";
	
	text += "<div class=\"panel\" id=\"indiPanel\">";
	text += "<div class=\"row\">";
	text += "<div class=\"col-md-4 col-md-offset-2\">";
	text += "<h2>" + organizations[0][1] + "</h2>";
	text += "<a href=\"" + organizations[0][4] + "\" target=\"_blank\">" + organizations[0][4] + "</a>";
	text += "</div>";
	text += "</div>";
	text += "<div class=\"row\">";
	text += "<div class=\"col-md-4 col-md-offset-2\" id=\"OrgInfoResult\">";
	
	//populates the addresses
	aLength = addresses.length();
	for(i = 0; i < aLength; i++){
	text += "<h4>" + addresses[i][0] + ", " + addresses[i][1] + ", " + stateName[i][0] + " " + addresses[i][2] + "</h4>";
	}
	
	text += "<br>";
	text += "<p>HOURS OF OPERATION</p>";
	
	//populate hours of operation
	//assumption made is that hours[i][0] will be regular hours, and hours[i][1] will be additional
	if(hours[0][1] == 1){
		text += "<p>Open 24 Hours</p>";
	}
	//if all weekdays match, prints a condensed version
	else if(hours[0][2] == 0 & hours[0][3] == hours[0][5] & hours[0][3] == hours[0][7] & hours[0][3] == hours[0][9] & hours[0][3] == hours[0][11]  
			& hours[0][4] == hours[0][6] & hours[0][4] == hours[0][8] & hours[0][4] == hours[0][10] & hours[0][4] == hours[0][12]){
		text += "<p>" + hours[0][3] + " - " + hours[0][4] + "(Monday - Friday)</p>";
		text += "<p>" + hours[0][3] + " - " + hours[0][4] + "(Monday - Friday)</p>";
		
		if(hours[0][13] != null){
			text += "<p>" + hours[0][13] + " - " + hours[0][14] + "(Saturday)</p>";
		}
		if(hours[0][15] != null){
			text += "<p>" + hours[0][15] + " - " + hours[0][16] + "(Sunday)</p>";
		}
	}
	//if times don't match, print all days seperately, does not print days without any hours[0]
	else if(hours[0][2] == 0){
		if(hours[0][3] != null){
			text += "<p>" + hours[0][3] + " - " + hours[0][4] + "(Monday)</p>";
		}
		if(hours[0][5] != null){
			text += "<p>" + hours[0][5] + " - " + hours[0][6] + "(Tuesday)</p>";
		}
		if(hours[0][7] != null){
			text += "<p>" + hours[0][7] + " - " + hours[0][7] + "(Wednesday)</p>";
		}
		if(hours[0][9] != null){
			text += "<p>" + hours[0][9] + " - " + hours[0][10] + "(Thursday)</p>";
		}
		if(hours[0][11] != null){
			text += "<p>" + hours[0][11] + " - " + hours[0][12] + "(Friday)</p>";
		}
		if(hours[0][13] != null){
			text += "<p>" + hours[0][13] + " - " + hours[0][14] + "(Saturday)</p>";
		}
		if(hours[0][15] != null){
			text += "<p>" + hours[0][15] + " - " + hours[0][16] + "(Sunday)</p>";
		}
	}
	//prints additional hours if present
	if(hours[1][0] != null){
		if(hours[1][17] != null){
			text += "<p>Additional Hours: " + hours[1][17] + "</p>"
		}
		if(hours[1][3] != null){
			text += "<p>" + hours[0][3] + " - " + hours[0][4] + "(Monday)</p>";
		}
		if(hours[1][5] != null){
			text += "<p>" + hours[0][5] + " - " + hours[0][6] + "(Tuesday)</p>";
		}
		if(hours[1][7] != null){
			text += "<p>" + hours[0][7] + " - " + hours[0][7] + "(Wednesday)</p>";
		}
		if(hours[1][9] != null){
			text += "<p>" + hours[0][9] + " - " + hours[0][10] + "(Thursday)</p>";
		}
		if(hours[1][11] != null){
			text += "<p>" + hours[0][11] + " - " + hours[0][12] + "(Friday)</p>";
		}
		if(hours[1][13] != null){
			text += "<p>" + hours[0][13] + " - " + hours[0][14] + "(Saturday)</p>";
		}
		if(hours[1][15] != null){
			text += "<p>" + hours[0][15] + " - " + hours[0][16] + "(Sunday)</p>";
		}
		
	
	}
	
	
}



