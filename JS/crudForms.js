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

function backToSearch() {
	document.getElementById("allSearch").style.display = 'block';
	document.getElementById("orgInfoResults").style.display= 'none';
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
	var advocacyRsc = document.getElementById("advocacyResourceCB").checked;
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
			advocacyRsc: advocacyRsc.toString(),
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
		text += "<h2><a onclick=\"getComplexData(" + orgs[i][0] + ")\" style=\"cursor: pointer;\">";
		text += orgs[i][1] + "</a></h2>";

		if (orgs[i][18] == 1) {
			text += "<h4>Open 24-Hours</h4>";
		}

		
		var myNum = orgs[i][2];
		if(myNum != null) {
		myNum = myNum.replace(/[^\/\d]/g,'');
		var formattedMyNum = (""+ myNum).replace(/\D/g, '');
		var p = formattedMyNum.match(/^(\d{3})(\d{3})(\d{4})$/);
		var FinalMyNum = (!p) ? null : "(" + p[1] + ") " + p[2] + "-" + p[3];
		}
		

		var hotlineNum = orgs[i][6];
		if(hotlineNum != null) {
		hotlineNum = hotlineNum.replace(/[^\/\d]/g,'');
		var formattedHotlineNum = (""+ hotlineNum).replace(/\D/g, '');
		var p = formattedHotlineNum.match(/^(\d{3})(\d{3})(\d{4})$/);
		var FinalHotlineNum = (!p) ? null : "(" + p[1] + ") " + p[2] + "-" + p[3];
		}

		text += "<p><a href=\"tel: 1" + myNum + "\">Phone: ";
		if (orgs[i][2] == null || orgs[i][2] == "" || orgs[i][2] == "+1 ") {
			text += "N/A";
		}
		else {
			text += FinalMyNum;

			if (orgs[i][3] == null || orgs[i][3] == "") {
				text += "";
			}
			else {
				text += " Ext. " + orgs[i][3];
			}

		}
		text += "</a></p>";

		text += "<h5><a href=\"tel:" + hotlineNum + "\">24-Hour Hotline: ";
		if (orgs[i][6] == null || orgs[i][6] == "" || orgs[i][6] == "+1 ") {
			text += "N/A";
		}
		else {
			text += FinalHotlineNum;
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

		text += "<button id=" + orgs[i][0] + " type=\"button\" class=\"updOrgButton btn btn-default btn-sm\" data-toggle= \"modal\" data-target=\"#updateModal\" onclick=\"populateUpdateFaiths();populateUpdateStates();loadUpdateModalData(" + orgs[i][0] + ");\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>";
		text += "<button id=" + orgs[i][0] + " type=\"button\" class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>";
		




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

	//test the input
	if(createFormValidation()){
		
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
		var fee = document.getElementById("txtAssociatedFeeCreate").value;
		var faith = document.getElementById("ddlFaithCreate").value;
		var notes = document.getElementById("txtNoteCreate").value;
		var confNotes = document.getElementById("txtConfidentialNoteCreate").value;
		var isConf = document.getElementById("cbIsConfCreate").checked;
	
	
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
		var black = document.getElementById("cbBlackCreate").checked;
		var asian = document.getElementById("cbAsianCreate").checked;
		var white = document.getElementById("cbWhiteCreate").checked;
		var hispanic = document.getElementById("cbHispanicLatinoCreate").checked;
		var native = document.getElementById("cbNativeCreate").checked;
		var multi = document.getElementById("cbMultiRacialCreate").checked;
	
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
				black: black.toString(),
				asian: asian.toString(),
				white: white.toString(),
				hispanic: hispanic.toString(),
				native: native.toString(),
				multi: multi.toStrint(),
				
	
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
	var fee = document.getElementById("txtAssociatedFeeUpdate").value;
	/*change to faith dropdown */
	var faith = document.getElementById("txtFaithUpdate").value;
	var notes = document.getElementById("txtNoteUpdate").value;
	var confNotes = document.getElementById("txtConfidentialNoteUpdate").value;
	var isConf = document.getElementById("cbIsConfUpdate").checked;


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
	var black = document.getElementById("cbBlackUpdate").checked;
	var asian = document.getElementById("cbAsianUpdate").checked;
	var white = document.getElementById("cbWhiteUpdate").checked;
	var hispanic = document.getElementById("cbHispanicLatinoUpdate").checked;
	var native = document.getElementById("cbNativeUpdate").checked;
	var multi = document.getElementById("cbMultiRacialUpdate").checked;

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
			black: black.toString(),
			asian: asian.toString(),
			white: white.toString(),
			hispanic: hispanic.toString(),
			native: native.toString(),
			multi: multi.toStrint(),

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

		/*	$("#ddlAddress1StateCreate").get(0).options.length = 0;
			$("#ddlAddress2StateCreate").get(0).options.length = 0;
			$("#ddlConfAddressStateCreate").get(0).options.length = 0; */
			$('<option/>').val("-----").html("-----").appendTo("#ddlAddress1StateCreate");
			$('<option/>').val("-----").html("-----").appendTo("#ddlAddress2StateCreate");
			$('<option/>').val("-----").html("-----").appendTo("#ddlConfAddressStateCreate");

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

	//		$("#ddlFaithCreate").get(0).options.length = 0;

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

	/*		$("#ddlAddress1StateUpdate").get(0).options.length = 0;
			$("#ddlAddress2StateUpdate").get(0).options.length = 0;
			$("#ddlConfAddressStateUpdate").get(0).options.length = 0; */
			
			$('<option/>').val("-----").html("-----").appendTo("#ddlAddress1StateUpdate");
			$('<option/>').val("-----").html("-----").appendTo("#ddlAddress2StateUpdate");
			$('<option/>').val("-----").html("-----").appendTo("#ddlConfAddressStateUpdate");

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

	//		$("#ddlFaithUpdate").get(0).options.length = 0; 

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

	/*load contacts table */

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
			
		
				document.getElementById("cbContactIsConfUpdate").checked = false;
				document.getElementById("txtPrimaryContactFirstNameUpdate").value = "";
				document.getElementById("txtPrimaryContactLastNameUpdate").value = "";
				document.getElementById("txtPrimaryContactPhoneUpdate").value = "";
				document.getElementById("txtPrimaryContactExtUpdate").value = "";
				document.getElementById("txtPrimaryContactEmailUpdate").value = "";
				document.getElementById("txtPrimaryContactPosUpdate").value = "";
				
				cLen = contacts.length;
				
				for (i = 0; i < cLen; i++) { 
					if(contacts[i][6] == 1) {
						document.getElementById("cbContactIsConfUpdate").checked = true;
					}

					document.getElementById("txtPrimaryContactFirstNameUpdate").value = contacts[i][2];
					document.getElementById("txtPrimaryContactLastNameUpdate").value = contacts[i][3];
				
				if(contacts[i][5] != null || contacts[i][5] != "") {
					var phoneNum = contacts[i][5];
					phoneNum = phoneNum.replace(/[^\/\d]/g,'');
					
					var formattedPhoneNum = (""+ phoneNum).replace(/\D/g, '');
					var m = formattedPhoneNum.match(/^(\d{3})(\d{3})(\d{4})$/);
					document.getElementById("txtPrimaryContactPhoneUpdate").value = (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
				
				}
					document.getElementById("txtPrimaryContactExtUpdate").value = contacts[i][7];
					document.getElementById("txtPrimaryContactEmailUpdate").value = contacts[i][1];
					document.getElementById("txtPrimaryContactPosUpdate").value = contacts[i][4];
				


				}
				
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
			var ethnicities = parsedData;
			
				document.getElementById("cbEthnicityAllUpdate").checked = false;
				document.getElementById("cbHispanicUpdate").checked = false;
				document.getElementById("cbNonHispanicUpdate").checked = false;
				document.getElementById("cbHispanicUpdate").disabled = false;
				document.getElementById("cbNonHispanicUpdate").disabled = false;
	
				
				eLen = ethnicities.length;
				
				for (i = 0; i < eLen; i++) { 
					if (ethnicities[i][0] == "All") {
					document.getElementById("cbEthnicityAllUpdate").checked = true;
					document.getElementById("cbHispanicUpdate").checked = true;
					document.getElementById("cbNonHispanicUpdate").checked = true;
					document.getElementById("cbHispanicUpdate").disabled = true;
					document.getElementById("cbNonHispanicUpdate").disabled = true;
					}
					else {
						if(ethnicities[i][0] == "Non-Latino/Hispanic") {
							document.getElementById("cbNonHispanicUpdate").checked = true;
						}
						if(ethnicities[i][0] == "Latino/Hispanic") {
							document.getElementById("cbHispanicUpdate").checked = true;
						}
					}
				}
		}
	}); 

	/*load gender table */

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
			
				document.getElementById("cbGenderAllUpdate").checked = false;
				document.getElementById("cbMaleUpdate").checked = false;
				document.getElementById("cbFemaleUpdate").checked = false;
				document.getElementById("cbTransUpdate").checked = false;
				document.getElementById("cbMaleUpdate").disabled = false;
				document.getElementById("cbFemaleUpdate").disabled = false;
				document.getElementById("cbTransUpdate").disabled = false;
	
				
				gLen = genders.length;
				
				for (i = 0; i < gLen; i++) { 
					if (genders[i][0] == "All") {
						document.getElementById("cbGenderAllUpdate").checked = true;
						document.getElementById("cbMaleUpdate").checked = true;
						document.getElementById("cbFemaleUpdate").checked = true;
						document.getElementById("cbTransUpdate").checked = true;
						document.getElementById("cbMaleUpdate").disabled = true;
						document.getElementById("cbFemaleUpdate").disabled = true;
						document.getElementById("cbTransUpdate").disabled = true;
					}
					else {
						if(genders[i][0] == "Male") {
							document.getElementById("cbMaleUpdate").checked = true;
						}
						if(genders[i][0] == "Female") {
							document.getElementById("cbFemaleUpdate").checked = true;
						}
						if(genders[i][0] == "Transgender") {
							document.getElementById("cbTransUpdate").checked = true;
						}
						
					}
				}
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
			var hours = parsedData;
			
				document.getElementById("cbIs247Update").checked = false;
			
				document.getElementById("ddlGenFullWeekStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenFullWeekEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenFullWeekSatStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenFullWeekSatEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenFullWeekSunStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenFullWeekSunEndTimeUpdate").value = "-----";
					
				document.getElementById("ddlGenMondayStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenMondayEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenTuesdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenTuesdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenWednesdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenWednesdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenThursdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenThursdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenFridayStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenFridayEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenSaturdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenSaturdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlGenSundayStartTimeUpdate").value = "-----";
				document.getElementById("ddlGenSundayEndTimeUpdate").value = "-----";
				
				document.getElementById("ddlAddFullWeekStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddFullWeekEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddFullWeekSatStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddFullWeekSatEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddFullWeekSunStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddFullWeekSunEndTimeUpdate").value = "-----";
					
				document.getElementById("ddlAddMondayStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddMondayEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddTuesdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddTuesdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddWednesdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddWednesdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddThursdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddThursdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddFridayStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddFridayEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddSaturdayStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddSaturdayEndTimeUpdate").value = "-----";
				document.getElementById("ddlAddSundayStartTimeUpdate").value = "-----";
				document.getElementById("ddlAddSundayEndTimeUpdate").value = "-----";
				
				document.getElementById("ddlGenFullWeekStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenFullWeekEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenFullWeekSatStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenFullWeekSatEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenFullWeekSunStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenFullWeekSunEndTimeUpdate").disabled = false;
					
				document.getElementById("ddlGenMondayStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenMondayEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenTuesdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenTuesdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenWednesdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenWednesdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenThursdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenThursdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenFridayStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenFridayEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenSaturdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenSaturdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlGenSundayStartTimeUpdate").disabled = false;
				document.getElementById("ddlGenSundayEndTimeUpdate").disabled = false;
				
				document.getElementById("ddlAddFullWeekStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddFullWeekEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddFullWeekSatStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddFullWeekSatEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddFullWeekSunStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddFullWeekSunEndTimeUpdate").disabled = false;
					
				document.getElementById("ddlAddMondayStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddMondayEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddTuesdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddTuesdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddWednesdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddWednesdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddThursdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddThursdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddFridayStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddFridayEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddSaturdayStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddSaturdayEndTimeUpdate").disabled = false;
				document.getElementById("ddlAddSundayStartTimeUpdate").disabled = false;
				document.getElementById("ddlAddSundayEndTimeUpdate").disabled = false;
				
				document.getElementById("txtAddHoursDescUpdate").value = "";
				
				
				hLen = hours.length;
				
				for (i = 0; i < hLen; i++) {
					
					if(hours[i][1] == 1) {
						document.getElementById("cbIs247Update").checked = true;
					}
			
					else {
						if(hours[i][2] == 0) {
							
							var fullWeekSM = hours[i][3]
							var fullWeekST = hours[i][5]
							var fullWeekSW = hours[i][7]
							var fullWeekSR = hours[i][9]
							var fullWeekSF = hours[i][11]
							
							var fullWeekEM = hours[i][4]
							var fullWeekET = hours[i][6]
							var fullWeekEW = hours[i][8]
							var fullWeekER = hours[i][10]
							var fullWeekEF = hours[i][12]
							
							if((fullWeekSM == fullWeekST && fullWeekSM == fullWeekSW && fullWeekSM == fullWeekSR && fullWeekSM == fullWeekSF) && 
							(fullWeekEM == fullWeekET && fullWeekEM == fullWeekEW && fullWeekEM == fullWeekSR && fullWeekEM == fullWeekEF)) {
								document.getElementById("ddlGenFullWeekStartTimeUpdate").value = hours[i][3];
								document.getElementById("ddlGenFullWeekEndTimeUpdate").value = hours[i][4];
								document.getElementById("ddlGenFullWeekSatStartTimeUpdate").value = hours[i][13];
								document.getElementById("ddlGenFullWeekSatEndTimeUpdate").value = hours[i][14];
								document.getElementById("ddlGenFullWeekSunStartTimeUpdate").value = hours[i][15];
								document.getElementById("ddlGenFullWeekSunEndTimeUpdate").value = hours[i][16];
							}
							else {
								
								document.getElementById("ddlGenMondayStartTimeUpdate").value = hours[i][3];
								document.getElementById("ddlGenMondayEndTimeUpdate").value = hours[i][4];
								document.getElementById("ddlGenTuesdayStartTimeUpdate").value = hours[i][5];
								document.getElementById("ddlGenTuesdayEndTimeUpdate").value = hours[i][6];
								document.getElementById("ddlGenWednesdayStartTimeUpdate").value = hours[i][7];
								document.getElementById("ddlGenWednesdayEndTimeUpdate").value = hours[i][8];
								document.getElementById("ddlGenThursdayStartTimeUpdate").value = hours[i][9];
								document.getElementById("ddlGenThursdayEndTimeUpdate").value = hours[i][10];
								document.getElementById("ddlGenFridayStartTimeUpdate").value = hours[i][11];
								document.getElementById("ddlGenFridayEndTimeUpdate").value = hours[i][12];
								document.getElementById("ddlGenSaturdayStartTimeUpdate").value = hours[i][13];
								document.getElementById("ddlGenSaturdayEndTimeUpdate").value = hours[i][14];
								document.getElementById("ddlGenSundayStartTimeUpdate").value = hours[i][15];
								document.getElementById("ddlGenSundayEndTimeUpdate").value = hours[i][16];
								
							}
							
						}
						else{
							if((fullWeekSM == fullWeekST && fullWeekSM == fullWeekSW && fullWeekSM == fullWeekSR && fullWeekSM == fullWeekSF) && 
							(fullWeekEM == fullWeekET && fullWeekEM == fullWeekEW && fullWeekEM == fullWeekSR && fullWeekEM == fullWeekEF)) {
								document.getElementById("ddlAddFullWeekStartTimeUpdate").value = hours[i][3];
								document.getElementById("ddlAddFullWeekEndTimeUpdate").value = hours[i][4];
								document.getElementById("ddlAddFullWeekSatStartTimeUpdate").value = hours[i][13];
								document.getElementById("ddlAddFullWeekSatEndTimeUpdate").value = hours[i][14];
								document.getElementById("ddlAddFullWeekSunStartTimeUpdate").value = hours[i][15];
								document.getElementById("ddlAddFullWeekSunEndTimeUpdate").value = hours[i][16];
							}
							else {
								
								document.getElementById("ddlAddMondayStartTimeUpdate").value = hours[i][3];
								document.getElementById("ddlAddMondayEndTimeUpdate").value = hours[i][4];
								document.getElementById("ddlAddTuesdayStartTimeUpdate").value = hours[i][5];
								document.getElementById("ddlAddTuesdayEndTimeUpdate").value = hours[i][6];
								document.getElementById("ddlAddWednesdayStartTimeUpdate").value = hours[i][7];
								document.getElementById("ddlAddWednesdayEndTimeUpdate").value = hours[i][8];
								document.getElementById("ddlAddThursdayStartTimeUpdate").value = hours[i][9];
								document.getElementById("ddlAddThursdayEndTimeUpdate").value = hours[i][10];
								document.getElementById("ddlAddFridayStartTimeUpdate").value = hours[i][11];
								document.getElementById("ddlAddFridayEndTimeUpdate").value = hours[i][12];
								document.getElementById("ddlAddSaturdayStartTimeUpdate").value = hours[i][13];
								document.getElementById("ddlAddSaturdayEndTimeUpdate").value = hours[i][14];
								document.getElementById("ddlAddSundayStartTimeUpdate").value = hours[i][15];
								document.getElementById("ddlAddSundayEndTimeUpdate").value = hours[i][16];
								
							}
							document.getElementById("txtAddHoursDescUpdate").value = hours[i][17];
							
						}
					}
				}
                                      
                               
			
		}
	}); 

	// load nationality table 

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
			var nationalities = parsedData;
			
				document.getElementById("cbNatAllUpdate").checked = false;
				document.getElementById("cbDomesticUpdate").checked = false;
				document.getElementById("cbForeignUpdate").checked = false;
				document.getElementById("cbUndocumentedUpdate").checked = false;
				document.getElementById("cbDomesticUpdate").disabled = false;
				document.getElementById("cbForeignUpdate").disabled = false;
				document.getElementById("cbUndocumentedUpdate").disabled = false;
			
				nLen = nationalities.length;
			
						
			for (i = 0; i < nLen; i++) { 
				if (nationalities[i][0] == "All") {
					document.getElementById("cbNatAllUpdate").checked = true;
					document.getElementById("cbDomesticUpdate").checked = true;
					document.getElementById("cbForeignUpdate").checked = true;
					document.getElementById("cbUndocumentedUpdate").checked = true;
					document.getElementById("cbDomesticUpdate").disabled = true;
					document.getElementById("cbForeignUpdate").disabled = true;
					document.getElementById("cbUndocumentedUpdate").disabled = true;
				}
				else {
					if (nationalities[i][0] == "Domestic-Born") {
						document.getElementById("cbDomesticUpdate").checked = true;
					}	
				
					if (nationalities[i][0] == "Foreign-Born") {
						document.getElementById("cbForeignUpdate").checked = true;
					}
				
					if (nationalities[i][0] == "Undocumented") {
						document.getElementById("cbUndocumentedUpdate").checked = true;
					}
				}
			}
		}
	}); 


	/*load organizations table */
	
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
			var orgs = parsedData;
			
			document.getElementById("cbIsConfUpdate").checked = false;
			
			document.getElementById("txtOrgNameUpdate").value = "";
			document.getElementById("txtOrgProgramUpdate").value = "";
			document.getElementById("txtMissionStatementUpdate").value = "";
	
			document.getElementById("txtMainPhoneUpdate").value = ""; 
			document.getElementById("txtMainPhoneExtUpdate").value = "";
			document.getElementById("txtHotlineUpdate").value = "";
			document.getElementById("txtOrgWebsiteUpdate").value = "";
			document.getElementById("txtOrgEmailUpdate").value = "";
			document.getElementById("txtConfPhoneUpdate").value = "";
			document.getElementById("txtConfExtUpdate").value = "";
			
			document.getElementById("cbHousingAllUpdate").checked = false;
			document.getElementById("cbShelterUpdate").checked = false;
			document.getElementById("cbTransitionalHousingUpdate").checked = false;
			document.getElementById("cbAssistLocateHousingUpdate").checked = false;
			document.getElementById("cbShelterUpdate").disabled = false;
			document.getElementById("cbTransitionalHousingUpdate").disabled = false;
			document.getElementById("cbAssistLocateHousingUpdate").disabled = false;
			
			document.getElementById("txtAssociatedFeeUpdate").value = "";
			
			document.getElementById("ddlFaithUpdate").value = "";
		
			document.getElementById("txtNoteUpdate").value = "";
			document.getElementById("txtConfidentialNoteUpdate").value = "";
			
			oLen = orgs.length;
			for (i = 0; i < oLen; i++) {
				
				if(orgs[i][15] == 1) {
					document.getElementById("cbIsConfUpdate").checked = true;
				}
				
				document.getElementById("txtOrgNameUpdate").value = orgs[i][1];
				document.getElementById("txtOrgProgramUpdate").value = orgs[i][17];
				document.getElementById("txtMissionStatementUpdate").value = orgs[i][2];
				
				document.getElementById("txtMainPhoneExtUpdate").value = orgs[i][18];
				document.getElementById("txtOrgWebsiteUpdate").value = orgs[i][3];
				document.getElementById("txtOrgEmailUpdate").value = orgs[i][4];
				document.getElementById("txtConfExtUpdate").value = orgs[i][19];
				
				var orgNum = orgs[i][5];
				if(orgNum !== null) {
					orgNum = orgNum.replace(/[^\/\d]/g,'');
					
					var formattedOrgNum = (""+ orgNum).replace(/\D/g, '');
					var o = formattedOrgNum.match(/^(\d{3})(\d{3})(\d{4})$/);
					document.getElementById("txtMainPhoneUpdate").value = (!o) ? null : "(" + o[1] + ") " + o[2] + "-" + o[3];
					
				}
				
				var hotlineNum = orgs[i][6];
				if(hotlineNum !== null) {
					hotlineNum = hotlineNum.replace(/[^\/\d]/g,'');
					
					var formattedHotlineNum = (""+ hotlineNum).replace(/\D/g, '');
					var h = formattedHotlineNum.match(/^(\d{3})(\d{3})(\d{4})$/);
					document.getElementById("txtHotlineUpdate").value = (!h) ? null : "(" + h[1] + ") " + h[2] + "-" + h[3];
				}
			
				var confNum = orgs[i][7];	
				if(confNum !== null) {	
					confNum = confNum.replace(/[^\/\d]/g,'');
					
					var formattedConfNum = (""+ confNum).replace(/\D/g, '');
					var c = formattedConfNum.match(/^(\d{3})(\d{3})(\d{4})$/);
					document.getElementById("txtConfPhoneUpdate").value = (!c) ? null : "(" + c[1] + ") " + c[2] + "-" + c[3];
				}
			
			
				if(orgs[i][8] == 1 && orgs[i][9] == 1 && orgs[i][10] == 1) {
				
					document.getElementById("cbHousingAllUpdate").checked = true;
					document.getElementById("cbShelterUpdate").checked = true;
					document.getElementById("cbTransitionalHousingUpdate").checked = true;
					document.getElementById("cbAssistLocateHousingUpdate").checked = true;
					document.getElementById("cbShelterUpdate").disabled = true;
					document.getElementById("cbTransitionalHousingUpdate").disabled = true;
					document.getElementById("cbAssistLocateHousingUpdate").disabled = true;
					
				}
				else {
					if(orgs[i][8] == 1) {
						document.getElementById("cbShelterUpdate").checked = true;
					}
					if(orgs[i][9] == 1) {
						document.getElementById("cbTransitionalHousingUpdate").checked = true;
					}
					if(orgs[i][10] == 1) {
						document.getElementById("cbAssistLocateHousingUpdate").checked = true;
					}
				}
				
			
				document.getElementById("txtAssociatedFeeUpdate").value = orgs[i][11];

				document.getElementById("ddlFaithUpdate").value = orgs[i][12];
		
				document.getElementById("txtNoteUpdate").value = orgs[i][13];
				document.getElementById("txtConfidentialNoteUpdate").value = orgs[i][14];
	
			
			}
			
			

		}
	}); 

	//load race table

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
			
			document.getElementById("cbRaceAllUpdate").checked = false;
			document.getElementById("cbWhiteUpdate").checked = false;
			document.getElementById("cbBlackUpdate").checked = false;
			document.getElementById("cbAsianUpdate").checked = false;
			document.getElementById("cbHispanicLatinoUpdate").checked = false;
			document.getElementById("cbNativeUpdate").checked = false;
			document.getElementById("cbMultiRacialUpdate").checked = false;
			document.getElementById("cbRaceAllUpdate").disabled = false;
			document.getElementById("cbWhiteUpdate").disabled = false;
			document.getElementById("cbBlackUpdate").disabled = false;
			document.getElementById("cbAsianUpdate").disabled = false;
			document.getElementById("cbHispanicLatinoUpdate").disabled = false;
			document.getElementById("cbNativeUpdate").disabled = false;
			document.getElementById("cbMultiRacialUpdate").disabled = false;
			
			
				console.log("race data: " + raceData[i]);
			for (i = 0; i < raceData.length; i++){
				
				if (raceData[i] == "All") {
					document.getElementById("cbRaceAllUpdate").checked = true;
					document.getElementById("cbWhiteUpdate").checked = true;
					document.getElementById("cbBlackUpdate").checked = true;
					document.getElementById("cbAsianUpdate").checked = true;
					document.getElementById("cbIslandUpdate").checked = true;
					document.getElementById("cbNativeUpdate").checked = true;
					document.getElementById("cbWhiteUpdate").disabled= true;
					document.getElementById("cbBlackUpdate").disabled= true;
					document.getElementById("cbAsianUpdate").disabled= true;
					document.getElementById("cbIslandUpdate").disabled = true;
					document.getElementById("cbNativeUpdate").disabled = true;
					break;
				}
				else {
					
					if (raceData[i] == "White") {
					document.getElementById("cbWhiteUpdate").checked = true;
					}
				
					if (raceData[i] == "Black or African American") {
					document.getElementById("cbBlackUpdate").checked = true;
					}
				
					if (raceData[i] == "Asian") {
					document.getElementById("cbAsianUpdate").checked = true;
					}
					if (raceData[i] == "Native Hawaiian or Other Pacific Islander") {
					document.getElementById("cbIslandUpdate").checked = true;
					}
					if (raceData[i] == "American Indian or Alaska Native") {
					document.getElementById("cbNativeUpdate").checked = true;
					}
			}
		}
		}
	}); 

	/* load requirements table */

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
			
			document.getElementById("cbMembershipUpdate").checked = false;
			document.getElementById("txtMembershipUpdate").value = "";
			document.getElementById("cbTrainingUpdate").checked = false;
			document.getElementById("txtTrainingUpdate").value = false;
			document.getElementById("cbApplicationUpdate").checked = false;
			document.getElementById("txtApplicationUpdate").value = "";
			document.getElementById("cbRestrictionUpdate").checked = false;
			document.getElementById("txtRestrictionUpdate").value = "";
			
			for (i = 0; i < requirementsData.length; i++) {
				
				if (requirementsData[i][0] == "Membership") {
					document.getElementById("cbMembershipUpdate").checked = true;
					if (requirementsData[i][1] != null && requirementsData[i][1] != "") {
						document.getElementById("txtMembershipUpdate").value = requirementsData[i][1];
					}
					
				}
				
				if (requirementsData[i][0] == "Training") {
					document.getElementById("cbTrainingUpdate").checked = true;
					if (requirementsData[i][1] != null && requirementsData[i][1] != "") {
						document.getElementById("txtTrainingUpdate").value = requirementsData[i][1];
					}
					
				}
				
				if (requirementsData[i][0] == "Application") {
					document.getElementById("cbApplicationUpdate").checked = true;
					if (requirementsData[i][1] != null && requirementsData[i][1] != "") {
						document.getElementById("txtApplicationUpdate").value = requirementsData[i][1];
					}
					
				}
				
				if (requirementsData[i][0] == "Possible Waiting List/Referral Required/Other Entry Restrictions") {
					document.getElementById("cbRestrictionUpdate").checked = true;
					if (requirementsData[i][1] != null && requirementsData[i][1] != ""){
						document.getElementById("txtRestrictionUpdate").value = requirementsData[i][1];
					}
				}
			}
		}
	}); 

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
				
				document.getElementById("cbClothingAllUpdate").checked = false;
				document.getElementById("cbClothingServUpdate").checked = false;
				document.getElementById("cbClothingSupplyUpdate").checked = false;
				document.getElementById("cbClothingEmergRespUpdate").checked = false;
				document.getElementById("cbClothingServUpdate").disabled = false;
				document.getElementById("cbClothingSupplyUpdate").disabled = false;
				document.getElementById("cbClothingEmergRespUpdate").disabled = false;
				document.getElementById("cbFoodAllUpdate").checked = false
				document.getElementById("cbFoodServUpdate").checked = false;
				document.getElementById("cbFoodSupplyUpdate").checked = false;
				document.getElementById("cbFoodEmergRespUpdate").checked = false;
				document.getElementById("cbFoodServUpdate").disabled = false;
				document.getElementById("cbFoodSupplyUpdate").disabled = false;
				document.getElementById("cbFoodEmergRespUpdate").disabled = false;
				document.getElementById("cbEmploymentAllUpdate").checked = false;
				document.getElementById("cbEmploymentServUpdate").checked = false;
				document.getElementById("cbEmploymentSupplyUpdate").checked = false;
				document.getElementById("cbEmploymentEmergRespUpdate").checked = false;
				document.getElementById("cbEmploymentServUpdate").disabled = false;
				document.getElementById("cbEmploymentSupplyUpdate").disabled = false;
				document.getElementById("cbEmploymentEmergRespUpdate").disabled = false;
				document.getElementById("cbMentoringAllUpdate").checked = false;
				document.getElementById("cbMentoringServUpdate").checked = false;
				document.getElementById("cbMentoringSupplyUpdate").checked = false;
				document.getElementById("cbMentoringEmergRespUpdate").checked = false;
				document.getElementById("cbMentoringServUpdate").disabled = false;
				document.getElementById("cbMentoringSupplyUpdate").disabled = false;
				document.getElementById("cbMentoringEmergRespUpdate").disabled = false;
				document.getElementById("cbCounselAllUpdate").checked = false;
				document.getElementById("cbCounselServUpdate").checked = false;
				document.getElementById("cbCounselSupplyUpdate").checked = false;
				document.getElementById("cbCounselEmergRespUpdate").checked = false;
				document.getElementById("cbCounselServUpdate").disabled = false;
				document.getElementById("cbCounselSupplyUpdate").disabled = false;
				document.getElementById("cbCounselEmergRespUpdate").disabled = false;
				document.getElementById("cbPregnancyAllUpdate").checked = false;
				document.getElementById("cbPregnancyServUpdate").checked = false;
				document.getElementById("cbPregnancySupplyUpdate").checked = false;
				document.getElementById("cbPregnancyEmergRespUpdate").checked = false;
				document.getElementById("cbPregnancyServUpdate").disabled = false;
				document.getElementById("cbPregnancySupplyUpdate").disabled = false;
				document.getElementById("cbPregnancyEmergRespUpdate").disabled = false;
				document.getElementById("cbMedicalAllUpdate").checked = false;
				document.getElementById("cbMedicalServUpdate").checked = false;
				document.getElementById("cbMedicalSupplyUpdate").checked = false;
				document.getElementById("cbMedicalEmergRespUpdate").checked = false;
				document.getElementById("cbMedicalServUpdate").disabled = false;
				document.getElementById("cbMedicalSupplyUpdate").disabled = false;
				document.getElementById("cbMedicalEmergRespUpdate").disabled = false;
				document.getElementById("cbLegalAllUpdate").checked = false;
				document.getElementById("cbLegalServUpdate").checked = false;
				document.getElementById("cbLegalSupplyUpdate").checked = false;
				document.getElementById("cbLegalEmergRespUpdate").checked = false;
				document.getElementById("cbLegalServUpdate").disabled = false;
				document.getElementById("cbLegalSupplyUpdate").disabled = false;
				document.getElementById("cbLegalEmergRespUpdate").disabled = false;
				document.getElementById("cbGovAllUpdate").checked = false;
				document.getElementById("cbGovServUpdate").checked = false;
				document.getElementById("cbGovSupplyUpdate").checked = false;
				document.getElementById("cbGovEmergRespUpdate").checked = false;
				document.getElementById("cbGovServUpdate").disabled = false;
				document.getElementById("cbGovSupplyUpdate").disabled = false;
				document.getElementById("cbGovEmergRespUpdate").disabled = false;
				document.getElementById("cbInvestigationAllUpdate").checked = false;
				document.getElementById("cbInvestigationServUpdate").checked = false;
				document.getElementById("cbInvestigationSupplyUpdate").checked = false;
				document.getElementById("cbInvestigationEmergRespUpdate").checked = false;
				document.getElementById("cbInvestigationServUpdate").disabled = false;
				document.getElementById("cbInvestigationSupplyUpdate").disabled = false;
				document.getElementById("cbInvestigationEmergRespUpdate").disabled = false;
				document.getElementById("cbFosterAllUpdate").checked = false;
				document.getElementById("cbFosterServUpdate").checked = false;
				document.getElementById("cbFosterSupplyUpdate").checked = false;
				document.getElementById("cbFosterEmergRespUpdate").checked = false;
				document.getElementById("cbFosterServUpdate").disabled = false;
				document.getElementById("cbFosterSupplyUpdate").disabled = false;
				document.getElementById("cbFosterEmergRespUpdate").disabled = false;
				document.getElementById("cbAwarenessEdAllUpdate").checked = false;
				document.getElementById("cbAwarenessEdServUpdate").checked = false;
				document.getElementById("cbAwarenessEdSupplyUpdate").checked = false;
				document.getElementById("cbAwarenessEdEmergRespUpdate").checked = false;
				document.getElementById("cbAwarenessEdServUpdate").disabled = false;
				document.getElementById("cbAwarenessEdSupplyUpdate").disabled = false;
				document.getElementById("cbAwarenessEdEmergRespUpdate").disabled = false;
				document.getElementById("cbResponseTrainAllUpdate").checked = false;
				document.getElementById("cbResponseTrainServUpdate").checked = false;
				document.getElementById("cbResponseTrainSupplyUpdate").checked = false;
				document.getElementById("cbResponseTrainEmergRespUpdate").checked = false;
				document.getElementById("cbResponseTrainServUpdate").disabled = false;
				document.getElementById("cbResponseTrainSupplyUpdate").disabled = false;
				document.getElementById("cbResponseTrainEmergRespUpdate").disabled = false;
				document.getElementById("cbSubstanceAbuseAllUpdate").checked = false;
				document.getElementById("cbSubstanceAbuseServUpdate").checked = false;
				document.getElementById("cbSubstanceAbuseSupplyUpdate").checked = false;
				document.getElementById("cbSubstanceAbuseEmergRespUpdate").checked = false;
				document.getElementById("cbSubstanceAbuseServUpdate").disabled = false;
				document.getElementById("cbSubstanceAbuseSupplyUpdate").disabled = false;
				document.getElementById("cbSubstanceAbuseEmergRespUpdate").disabled = false;
				document.getElementById("cbAdvocacyAllUpdate").checked = false;
				document.getElementById("cbAdvocacyServUpdate").checked = false;
				document.getElementById("cbAdvocacySupplyUpdate").checked = false;
				document.getElementById("cbAdvocacyEmergRespUpdate").checked = false;
				document.getElementById("cbAdvocacyServUpdate").disabled = false;
				document.getElementById("cbAdvocacySupplyUpdate").disabled = false;
				document.getElementById("cbAdvocacyEmergRespUpdate").disabled = false;
				document.getElementById("cbOtherAllUpdate").checked = false;
				document.getElementById("cbOtherServUpdate").checked = false;
				document.getElementById("cbOtherSupplyUpdate").checked = false;
				document.getElementById("cbOtherEmergRespUpdate").checked = false;
				document.getElementById("cbOtherServUpdate").disabled = false;
				document.getElementById("cbOtherSupplyUpdate").disabled = false;
				document.getElementById("cbOtherEmergRespUpdate").disabled = false;
				
				for (i = 0; i < serviceData.length; i++) {
					
					if (serviceData[i][1] == "Clothing") {
						
						if (serviceData[i][2] == 1 && serviceData[i][3] == 1 && serviceData[i][4] == 1) {
							
							document.getElementById("cbClothingAllUpdate").checked = true;
							document.getElementById("cbClothingServUpdate").checked = true;
							document.getElementById("cbClothingSupplyUpdate").checked = true;
							document.getElementById("cbClothingEmergRespUpdate").checked = true;
							document.getElementById("cbClothingServUpdate").disabled = true;
							document.getElementById("cbClothingSupplyUpdate").disabled = true;
							document.getElementById("cbClothingEmergRespUpdate").disabled = true;
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
							document.getElementById("cbFoodServUpdate").disabled = true;
							document.getElementById("cbFoodSupplyUpdate").disabled = true;
							document.getElementById("cbFoodEmergRespUpdate").disabled = true;
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
							document.getElementById("cbEmploymentServUpdate").disabled = true;
							document.getElementById("cbEmploymentSupplyUpdate").disabled = true;
							document.getElementById("cbEmploymentEmergRespUpdate").disabled = true;
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
							document.getElementById("cbMentoringServUpdate").disabled = true;
							document.getElementById("cbMentoringSupplyUpdate").disabled = true;
							document.getElementById("cbMentoringEmergRespUpdate").disabled = true;
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
							document.getElementById("cbCounselServUpdate").disabled = true;
							document.getElementById("cbCounselSupplyUpdate").disabled = true;
							document.getElementById("cbCounselEmergRespUpdate").disabled = true;
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
							document.getElementById("cbPregnancyServUpdate").disabled = true;
							document.getElementById("cbPregnancySupplyUpdate").disabled = true;
							document.getElementById("cbPregnancyEmergRespUpdate").disabled = true;
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
							document.getElementById("cbMedicalServUpdate").disabled = true;
							document.getElementById("cbMedicalSupplyUpdate").disabled = true;
							document.getElementById("cbMedicalEmergRespUpdate").disabled = true;
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
							document.getElementById("cbLegalServUpdate").disabled = true;
							document.getElementById("cbLegalSupplyUpdate").disabled = true;
							document.getElementById("cbLegalEmergRespUpdate").disabled = true;
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
							document.getElementById("cbGovServUpdate").disabled = true;
							document.getElementById("cbGovSupplyUpdate").disabled = true;
							document.getElementById("cbGovEmergRespUpdate").disabled = true;
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
							document.getElementById("cbInvestigationServUpdate").disabled = true;
							document.getElementById("cbInvestigationSupplyUpdate").disabled = true;
							document.getElementById("cbInvestigationEmergRespUpdate").disabled = true;
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
							document.getElementById("cbFosterServUpdate").disabled = true;
							document.getElementById("cbFosterSupplyUpdate").disabled = true;
							document.getElementById("cbFosterEmergRespUpdate").disabled = true;
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
							document.getElementById("cbAwarenessEdServUpdate").disabled = true;
							document.getElementById("cbAwarenessEdSupplyUpdate").disabled = true;
							document.getElementById("cbAwarenessEdEmergRespUpdate").disabled = true;
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
							document.getElementById("cbResponseTrainServUpdate").disabled = true;
							document.getElementById("cbResponseTrainSupplyUpdate").disabled = true;
							document.getElementById("cbResponseTrainEmergRespUpdate").disabled = true;
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
							document.getElementById("cbSubstanceAbuseServUpdate").disabled = true;
							document.getElementById("cbSubstanceAbuseSupplyUpdate").disabled = true;
							document.getElementById("cbSubstanceAbuseEmergRespUpdate").disabled = true;
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
							document.getElementById("cbOtherServUpdate").disabled = true;
							document.getElementById("cbOtherSupplyUpdate").disabled = true;
							document.getElementById("cbOtherEmergRespUpdate").disabled = true;
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
							document.getElementById("cbAdvocacyServUpdate").disabled = true;
							document.getElementById("cbAdvocacySupplyUpdate").disabled = true;
							document.getElementById("cbAdvocacyEmergRespUpdate").disabled = true;
						}
						
						if (serviceData[i][2] == 1) {
							document.getElementById("cbAdvocacyServUpdate").checked = true;
						}
						
						if (serviceData[i][3] == 1) {
							document.getElementById("cbAdvocacySupplyUpdate").checked = true;
						}
						
						if (serviceData[i][4] == 1) {
							document.getElementById("cbAdvocacyEmergRespUpdate").checked = true;
						}
						
						if (serviceData[i][5] != null && serviceData[i][5] != "") {
							document.getElementById("txtAdvocacyDescUpdate").value = serviceData[i][5];
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
            $("#cbNativeCreate").prop('checked', true).prop('disabled', true);
            $("#cbHispanicLatinoCreate").prop('checked', true).prop('disabled', true);
            $("#cbMultiRacialCreate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbWhiteCreate").prop('disabled',false).prop('checked', false);
           $("#cbBlackCreate").prop('disabled',false).prop('checked', false);
           $("#cbAsianCreate").prop('disabled',false).prop('checked', false);
           $("#cbNativeCreate").prop('disabled',false).prop('checked', false);
           $("#cbHispanicLatinoCreate").prop('disabled',false).prop('checked', false);
           $("#cbMultiRacialCreate").prop('disabled',false).prop('checked', false);
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
            $("#cbNativeUpdate").prop('checked', true).prop('disabled', true);
            $("#cbHispanicLatinoUpdate").prop('checked', true).prop('disabled', true);
            $("#cbMultiRacialUpdate").prop('checked', true).prop('disabled', true);
        }
        else{
           $("#cbWhiteUpdate").prop('disabled',false).prop('checked', false);
           $("#cbBlackUpdate").prop('disabled',false).prop('checked', false);
           $("#cbAsianUpdate").prop('disabled',false).prop('checked', false);
           $("#cbNativeUpdate").prop('disabled',false).prop('checked', false);
           $("#cbHispanicLatinoUpdate").prop('disabled',false).prop('checked', false);
           $("#cbMultiRacialUpdate").prop('disabled',false).prop('checked', false);
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
	checkAllDisableCreate();
	checkAllDisableUpdate();
	checkHoursCreate();
	checkHoursUpdate();
	populateCreateStates();
	populateCreateFaiths();
	populateUpdateStates();
	populateUpdateFaiths();
	document.getElementById("allSearch").style.display= 'block';
	document.getElementById("orgInfoResults").style.display= 'none';
}

function getComplexData(orgId) {

	document.getElementById("allSearch").style.display = 'none';
	document.getElementById("orgInfoResults").style.display= 'block';
	
	/*load addresses table*/
	$.ajax({
		url: '/PHP/loadUpdateData.php',
		type: 'POST',
		data: {
			method: "getAddressUpdateData",
			orgId: orgId
		},
		success: function(data) {
			console.log("addressses: " + data);
			var parsedData = JSON.parse(data);
			var addresses = parsedData;
			
			document.getElementById("orgInfoAddressConf").innerHTML = "";
			document.getElementById("orgInfoAddress2").innerHTML = "";
			document.getElementById("orgInfoAddress1").innerHTML = "";
			
			aLen = addresses.length;
		
			for (i = 0; i < aLen; i++) {
				if(addresses[i][5] == 1) {
					document.getElementById("orgInfoAddressConf").innerHTML = "<p>Confidential Addresses: " + addresses[i][0] + ", " + addresses[i][1] + ", " + addresses[i][4] + " " + addresses[i][2] + "</p>";
				}
				else {
					if(i >= 1) {
						document.getElementById("orgInfoAddress2").innerHTML = "<p>Secondary Address: " + addresses[i][0] + ", " + addresses[i][1] + ", " + addresses[i][4] + " " + addresses[i][2] + "</p>";
						 
					}
					else {
						document.getElementById("orgInfoAddress1").innerHTML = "<h5>Primary Address: " + addresses[i][0] + ", " + addresses[i][1] + ", " + addresses[i][4] + " " + addresses[i][2] + "</h5>";
				}
	
			
			}
			
			
			}
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
			var ages = parsedData;
			
				document.getElementById("orgInfoAges").innerHTML = "";	
					
				aLen = ages.length;
				
				for (i = 0; i < aLen; i++) { 
					if (ages[i][0] == "All") {
						document.getElementById("orgInfoAges").innerHTML = "<p>All</p>";
					}
					else {
						var text = "";
						if(ages[i][0] == "Infants/Toddlers") {
							text += "<p>Infants/Toddlers (0-4)</p>";
						}
						if(ages[i][0] == "Children") {
							text += "<p>Children (5-12)</p>";
						}
						if(ages[i][0] == "Youth/Young Adults") {
							text += "<p>Youth/Young Adults (13-17)</p>";
						}
						if(ages[i][0] == "Adults") {
							text += "<p>Adults (18+)</p>";
						}
						document.getElementById("orgInfoAges").innerHTML = text;
					}
				}
				
			
			
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
			var contacts = parsedData;
			
			document.getElementById("orgInfoContactEmail").innerHTML = "";
			document.getElementById("orgInfoContactName").innerHTML = "";
			document.getElementById("orgInfoContactPosition").innerHTML = "";
			document.getElementById("orgInfoContactPhone").innerHTML = "";
		
				
				cLen = contacts.length;
				
				for (i = 0; i < cLen; i++) { 
					
					var email = contacts[i][1];
					var firstname = contacts[i][2];
					var lastname = contacts[i][3];
					var position = contacts[i][4];
					var phone = contacts[i][5];
					var ext = "Ext. " + contacts[i][7];
					
					
					if(email == null || email == "") {
						email = "N/A";
					}
					if((firstname == null || firstname == "") && (lastname == null || lastname == "")) {
						name = "N/A";
					}
					if(position == null || position == "") {
						position = "N/A";
					}
					if(phone == null || phone == "") {
						phone = "N/A";
					}
					if(ext == "Ext. null") {
						ext = "";
					}
					
					if(phone !== "N/A")
						phone = phone.replace(/[^\/\d]/g,'');
					
						var formattedPhone = (""+ phone).replace(/\D/g, '');
						var m = formattedPhone.match(/^(\d{3})(\d{3})(\d{4})$/);
						phone = (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
					
	
					document.getElementById("orgInfoContactEmail").innerHTML = "<p>Email: " + email + "</p>";
					document.getElementById("orgInfoContactName").innerHTML = "<p>Name: " + firstname + " " + lastname + "</p>";
					document.getElementById("orgInfoContactPosition").innerHTML = "<p>Position: " + position + "</p>";
					document.getElementById("orgInfoContactPhone").innerHTML = "<p>Phone: " + phone + " " + ext + "</p>";
				
				


				}
				
			
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
			var ethnicities = parsedData;
			
			document.getElementById("orgInfoEthnicities").innerHTML = "";
			var text = "<p>";
			for(i = 0; ethnicities[0][i] != null; i++){
				if(text == "<p>"){
					text += ethnicities[0][i];
				}
				else{
					text+= ", " + ethnicities[0][i];
				}
			}
			text += "</p>";
			
			document.getElementById("orgInfoEthnicities").innerHTML = text;
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
			var genders = parsedData;
			
			document.getElementById("orgInfoGenders").innerHTML = "";
			var text = "<p>";
			for(i = 0; genders[0][i] != null; i++){
				if(text == "<p>"){
					text += genders[0][i];
				}
				else{
					text+= ", " + genders[0][i];
				}
			}
			text += "</p>";
			
			document.getElementById("orgInfoGenders").innerHTML = text;
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
			var hours = parsedData;
			
			document.getElementById("orgInfoHours").innerHTML = "";
			var text = "";
			
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
				
				if(hours[0][13] != "-----"){
					text += "<p>" + hours[0][13] + " - " + hours[0][14] + "(Saturday)</p>";
				}
				if(hours[0][15] != "-----"){
					text += "<p>" + hours[0][15] + " - " + hours[0][16] + "(Sunday)</p>";
				}
			}
			//if times don't match, print all days seperately, does not print days without any hours[0]
			else if(hours[0][2] == 0){
				if(hours[0][3] != "-----"){
					text += "<p>" + hours[0][3] + " - " + hours[0][4] + "(Monday)</p>";
				}
				if(hours[0][5] != "-----"){
					text += "<p>" + hours[0][5] + " - " + hours[0][6] + "(Tuesday)</p>";
				}
				if(hours[0][7] != "-----"){
					text += "<p>" + hours[0][7] + " - " + hours[0][7] + "(Wednesday)</p>";
				}
				if(hours[0][9] != "-----"){
					text += "<p>" + hours[0][9] + " - " + hours[0][10] + "(Thursday)</p>";
				}
				if(hours[0][11] != "-----"){
					text += "<p>" + hours[0][11] + " - " + hours[0][12] + "(Friday)</p>";
				}
				if(hours[0][13] != "-----"){
					text += "<p>" + hours[0][13] + " - " + hours[0][14] + "(Saturday)</p>";
				}
				if(hours[0][15] != "-----"){
					text += "<p>" + hours[0][15] + " - " + hours[0][16] + "(Sunday)</p>";
				}
			}
			//prints additional hours if present
			try{
				if(hours[1][0] != null){
					if(hours[1][17] != "-----"){
						text += "<p>Additional Hours: " + hours[1][17] + "</p>"
					}
					if(hours[1][3] != "-----"){
						text += "<p>" + hours[1][3] + " - " + hours[1][4] + "(Monday)</p>";
					}
					if(hours[1][5] != "-----"){
						text += "<p>" + hours[1][5] + " - " + hours[1][6] + "(Tuesday)</p>";
					}
					if(hours[1][7] != "-----"){
						text += "<p>" + hours[1][7] + " - " + hours[1][8] + "(Wednesday)</p>";
					}
					if(hours[1][9] != "-----"){
						text += "<p>" + hours[1][9] + " - " + hours[1][10] + "(Thursday)</p>";
					}
					if(hours[1][11] != "-----"){
						text += "<p>" + hours[1][11] + " - " + hours[1][12] + "(Friday)</p>";
					}
					if(hours[1][13] != "-----"){
						text += "<p>" + hours[1][13] + " - " + hours[1][14] + "(Saturday)</p>";
					}
					if(hours[1][15] != "-----"){
						text += "<p>" + hours[1][15] + " - " + hours[1][16] + "(Sunday)</p>";
					}
				}
			}
			catch(err){
				
			}

			document.getElementById("orgInfoHours").innerHTML = text;
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
			var nationalities = parsedData;
			
			document.getElementById("orgInfoNationalities").innerHTML = "";
			var text = "<p>";
			for(i = 0; nationalities[0][i] != null; i++){
				if(text == "<p>"){
					text += nationalities[0][i];
				}
				else{
					text+= ", " + nationalitites[0][i];
				}
			}
			text += "</p>";
			
			document.getElementById("orgInfoNationalities").innerHTML = text;			
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
			var organizations = parsedData;
			
		document.getElementById("orgInfoTitle").innerHTML = "";
		document.getElementById("orgInfoWebLink").innerHTML = "";
		document.getElementById("orgInfoPhone").innerHTML = "";
		document.getElementById("orgInfoHotline").innerHTML = "";
		document.getElementById("orgInfoConfPhone").innerHTML = "";
		document.getElementById("orgInfoEmail").innerHTML = "";
		document.getElementById("orgInfoFaith").innerHTML = "";
		document.getElementById("orgInfoFee").innerHTML = "";
		document.getElementById("orgInfoMissionStatement").innerHTML = "";
		document.getElementById("orgInfoNotes").innerHTML = "";
		document.getElementById("orgInfoConfNotes").innerHTML = "";
		document.getElementById("orgInfoServicesFromOrgTable").innerHTML = "";
		
		document.getElementById("orgInfoTitle").innerHTML = "<h2>" + organizations[0][1] + "</h2>";
		
		if(organizations[0][3] != null){
			document.getElementById("orgInfoWebLink").innerHTML = "<a href=\"" + organizations[0][3] + "\" target=\"_blank\">" + organizations[0][3] + "</a>";
		}
		if(organizations[0][2] != null){
			document.getElementById("orgInfoEmail").innerHTML = "Email: " + organizations[0][4];
		}
		
		document.getElementById("orgInfoFaith").innerHTML = "<p>" + organizations[0][12] + "</p>";
		document.getElementById("orgInfoFee").innerHTML = "<p>$" + organizations[0][11] + "</p>";
		
		document.getElementById("orgInfoMissionStatement").innerHTML = "<p>" + organizations[0][2] + "</p>";
		document.getElementById("orgInfoNotes").innerHTML = "<p>" + organizations[0][13] + "</p>";;
		document.getElementById("orgInfoConfNotes").innerHTML = "<p>" + organizations[0][14] + "</p>";;
		
		//main phone
		var phone = organizations[0][5]
		if(phone !== null){
						phone = phone.replace(/[^\/\d]/g,'');
					
						var formattedPhone = (""+ phone).replace(/\D/g, '');
						var m = formattedPhone.match(/^(\d{3})(\d{3})(\d{4})$/);
						phone = (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
						
						document.getElementById("orgInfoPhone").innerHTML = "<p>Phone: " + phone + "</p>";
		}
		
		
		//hotline
		phone = organizations[0][6]
		if(phone !== null){
						phone = phone.replace(/[^\/\d]/g,'');
					
						var formattedPhone = (""+ phone).replace(/\D/g, '');
						var m = formattedPhone.match(/^(\d{3})(\d{3})(\d{4})$/);
						phone = (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
						
						document.getElementById("orgInfoHotline").innerHTML = "<p>Hotline: " + phone + "</p>";
		}
		
		
		//conf phone
		phone = organizations[0][7]
		if(phone !== null){
						phone = phone.replace(/[^\/\d]/g,'');
					
						var formattedPhone = (""+ phone).replace(/\D/g, '');
						var m = formattedPhone.match(/^(\d{3})(\d{3})(\d{4})$/);
						phone = (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
						
						document.getElementById("orgInfoConfPhone").innerHTML = "<p>Confidential Phone: " + phone + "</p>";
		}
		
		//add services from org table
		var text = "<ul>";
		if(organizations[0][8] == 1){
			text += "<li>Shelter</li>";
		}
		if(organizations[0][9] == 1){
			text += "<li>Transitional Housing</li>";
		}
		if(organizations[0][10] == 1){
			text += "<li>Assistance Locating Housing</li>";
		}
		text += "</ul>";
		document.getElementById("orgInfoServicesFromOrgTable").innerHTML = text;
		
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
			var races = parsedData;

			document.getElementById("orgInfoRaces").innerHTML = "";
			var text = "<p>";
			for(i = 0; races[0][i] != null; i++){
				if(text == "<p>"){
					text += races[0][i];
				}
				else{
					text+= ", " + races[0][i];
				}
			}
			text += "</p>";
			
			document.getElementById("orgInfoRaces").innerHTML = text;

		}
	});

	/*load requirements table*/
	$.ajax({
		url: '/PHP/loadComplexData.php',
		type: 'POST',
		data: {
			method: "getRequirementsComplexData",
			orgId: orgId
		},
		success: function(data) {
			console.log("requirements: " + data);
			var parsedData = JSON.parse(data);
			var requirements = parsedData;
			
			document.getElementById("orgInfoRequirements").innerHTML = "";
			var text = "";
			
			text = "<ul>";
			rlength = requirements.length;
			
			for(i = 0; i < rlength; i ++){
				if(requirements[i][1] != null){
					text += "<li>" + requirements[i][0] + ": " + requirements[i][1] + "</li>";
				}
				else{
					text += "<li>" + requirements[i][0] + "</li>";
				}
			}
			text += "</ul>";
			document.getElementById("orgInfoRequirements").innerHTML = text;
			
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
			var services = parsedData;

			document.getElementById("orgInfoServices").innerHTML = "";
			var text = "<ul>";
			var sLength = services.length;
			
			for(i = 0; i < sLength; i++){
				var count = 0;
				text += "<li>" + services[i][1];
				
				//adds description
				if(services[i][5] != null){
					text += ": " + services[i][5];
				}
				
				//checks each service type
				if(services[i][2] != null){
					if(count == 0){
						text += " (Service";
						count ++;
					}
					else{
						text += ", Service";
					}
				}
				if(services[i][3] != null){
					if(count == 0){
						text += " (Supply";
						count ++;
					}
					else{
						text += ", Supply";
					}
				}
				if(services[i][4] != null){
					if(count == 0){
						text += " (Emergency";
						count ++;
					}
					else{
						text += ", Emergency";
					}
				}
				text += ")</li>";
			}
			text += "</ul>";
			document.getElementById("orgInfoServices").innerHTML = text;
			
			}
		}); 
}

function createFormValidation(){
	//General Organization Information
	var genInfoError = "";
	if(document.getElementById("txtOrgNameCreate").value == ""){
		genInfoError = "Please enter an Organization name.";
		document.getElementById("orgInfoErrorText").innerHTML = genInfoError;
		return false;
	}

	//Contact Information
	
}

function btnOrganizationInfoOnClick() {
	$('#updateModalTabs a[href="#orgInfoUpdate"]').tab('show');
	document.getElementById("txtOrgNameUpdate").focus();
}

function btnResourcesOfferedOnClick() {
    $('#updateModalTabs a[href="#orgResourcesUpdate"]').tab('show');
	document.getElementById("cbHousingAllUpdate").focus();
}

function btnAdditionalConsiderationsOnClick(){
	$('#updateModalTabs a[href="#orgAddConsiderationsUpdate"]').tab('show');
	document.getElementById("txtAssociatedFeeUpdate").focus();
}

function btnDemographicsServedOnClick() {
	$('#updateModalTabs a[href="#orgDemographicsServedUpdate"]').tab('show');
	document.getElementById("cbGenderAllUpdate").focus();
}

function btnNotesOnClick() {
		$('#updateModalTabs a[href="#orgNotesUpdate"]').tab('show');
		document.getElementById("txtNoteUpdate").focus();
}




        /*
        
        
        $('#btnOrgInfo').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
        })
        
        $('#btnAdditionalConsiderationsForward').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
        })
        
        
        
        $('#btnResourcesOfferedBack').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
        })
        
        $('#btnDemographicsServedForward').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
        })
        
        
        
        $('#btnAdditionalConsiderationsBack').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
        })
        
        $('#btnNotes').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
        })
        
        
        
        $('#btnDemographicsServedBack').click(function(e){
        e.preventDefault();
        $('#mytabs a[href="#second"]').tab('show');
        })
        
        
} */
