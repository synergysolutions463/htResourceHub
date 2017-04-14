var loggedIn = "";
var username = "";

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

function resetChangePassword() {
		document.getElementById("passwordInputs").style.display = 'block';
		document.getElementById("successPasswordMessage").style.display = 'none';
		document.getElementById("successPasswordMessage").innerHTML = "";
		document.getElementById("btnChangePassword").style.display = 'block';
		document.getElementById("btnResetChangePassword").style.display = 'none';
		document.getElementById("ddlUsernames").value = "admin1";
		document.getElementById("oldPasswordTxt").value = "";
		document.getElementById("newPasswordTxt").value = ""; 
		document.getElementById("confirmPasswordTxt").value = "";
}

function changePassword() {
	console.log("change password function hit"); 
	var username = document.getElementById("ddlUsernames").value;
	var oldPassword = document.getElementById("oldPasswordTxt").value;
	var newPassword = document.getElementById("newPasswordTxt").value;
	var confirmPassword = document.getElementById("confirmPasswordTxt").value;
	
	if (username == null || oldPassword == "" || oldPassword == null || newPassword == "" || newPassword == null || confirmPassword == "" || confirmPassword == null) {
		console.log("a field is empty");
				document.getElementById("passwordInputs").style.display = 'none';
				document.getElementById("successPasswordMessage").style.display = 'block';
				document.getElementById("successPasswordMessage").innerHTML = "<h5>You must fill in every field</h5>";
				document.getElementById("btnChangePassword").style.display = 'none';
				document.getElementById("btnResetChangePassword").style.display = 'block';
		
	}
	else if (newPassword != confirmPassword) {
		console.log("new and confirm passwords don't match");
				document.getElementById("passwordInputs").style.display = 'none';
				document.getElementById("successPasswordMessage").style.display = 'block';
				document.getElementById("successPasswordMessage").innerHTML = "<h5>The new passwords provided do not match</h5>";
				document.getElementById("btnChangePassword").style.display = 'none';
				document.getElementById("btnResetChangePassword").style.display = 'block';
	}
	else {
		console.log("data should be good. username: " + username + " old pass: " + oldPassword + " newPass: " + newPassword + " confirmpass: " + confirmPasswordTxt);
		$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "changePassword", username: username, oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword
		},
		success: function(data) {
			console.log(data);
			if(data == "Not logged in") {
				document.getElementById("passwordInputs").style.display = 'none';
				document.getElementById("successPasswordMessage").style.display = 'block';
				document.getElementById("successPasswordMessage").innerHTML = "<h5>Password change not successful, you aren't logged in</h5>";
				document.getElementById("btnChangePassword").style.display = 'none';
				document.getElementById("btnResetChangePassword").style.display = 'block';
			}
			if(data == "Not logged in as admin1") {
				document.getElementById("passwordInputs").style.display = 'none';
				document.getElementById("successPasswordMessage").style.display = 'block';
				document.getElementById("successPasswordMessage").innerHTML = "<h5>Password change not successful, you aren't logged in as admin1</h5>";
				document.getElementById("btnChangePassword").style.display = 'none';
				document.getElementById("btnResetChangePassword").style.display = 'block';
			}
			if(data == "invalid old pass") {
				document.getElementById("passwordInputs").style.display = 'none';
				document.getElementById("successPasswordMessage").style.display = 'block';
				document.getElementById("successPasswordMessage").innerHTML = "<h5>Password change not successful, you gave an invalid old password</h5>";
				document.getElementById("btnChangePassword").style.display = 'none';
				document.getElementById("btnResetChangePassword").style.display = 'block';
			}
			if(data == "invalid username") {
				document.getElementById("passwordInputs").style.display = 'none';
				document.getElementById("successPasswordMessage").style.display = 'block';
				document.getElementById("successPasswordMessage").innerHTML = "<h5>Password change not successful, selected an invalid username</h5>";
				document.getElementById("btnChangePassword").style.display = 'none';
				document.getElementById("btnResetChangePassword").style.display = 'block';
			}
			if(data == "change password was successful") {
				document.getElementById("passwordInputs").style.display = 'none';
				document.getElementById("successPasswordMessage").style.display = 'block';
				document.getElementById("successPasswordMessage").innerHTML = "<h5>Password changed successfully</h5>";
				document.getElementById("btnChangePassword").style.display = 'none';
			}

		}
	});
	}
	
}

function backToSearch() {
	document.getElementById("allSearch").style.display = 'block';
	document.getElementById("orgInfoResults").style.display= 'none';
}

function readAllOrgs() {
	checkIfLoggedIn();
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
			if (data == "") {
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

function hide(target) {
	document.getElementById(target).style.display = 'none';
}

function show(target) {
	document.getElementById(target).style.display = 'block';
}

function resetLogin() {
		document.getElementById("loginInputs").style.display = 'block';
		document.getElementById("loginMessage").style.display = 'none';
		document.getElementById("loginMessage").innerHTML = "";
		document.getElementById("usernameTxt").value = "";
		document.getElementById("passwordTxt").value = "";
		document.getElementById("btnLogin").disabled = false;
		
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
			if (data == "false") {
				document.getElementById("loginInputs").style.display = 'none';
				document.getElementById("loginMessage").style.display = 'block';
				document.getElementById("loginMessage").innerHTML = "<h5>Login unsuccessful</h5><button type=\"button\" class=\"btn btn-default\" onclick=\"resetLogin()\">Retry</button>"
				document.getElementById("btnLogin").disabled = true;
				checkIfLoggedIn();
				
			}
			else {
				document.getElementById("loginInputs").style.display = 'none';
				document.getElementById("loginMessage").style.display = 'block';
				document.getElementById("loginMessage").innerHTML = "<h5>Login successful, hello " + data + "!</h5>";
				document.getElementById("btnLogin").disabled = true;
				checkIfLoggedIn();
				location.reload();
				
			} 

			
		}
	});

}

function logout() {
	$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "logout",
		},
		success: function(data) {
			username = "";
		}
	});
	
	location.reload();
}

function checkIfLoggedIn() {

		$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "checkIfLoggedIn"
		},
		success: function(data) {
			if (data == "false") {
				loggedIn = "false";
				document.getElementById("loginNav").innerHTML = "<a href=\"#\" data-toggle=\"modal\" data-target=\"#loginModal\" onclick=\"resetLogin()\">Login</a>";
				document.getElementById("isApprovedCreate").style.display = 'none';
			}
			else {
				loggedIn = "true";
				username = data;
				localStorage.setItem("username", username);
				document.getElementById("loginNav").innerHTML = "<a href=\"adminPage.html\" onclick=\"loadAdminPage()\">Admin</a>";
				if(username == "admin1") {
					document.getElementById("isApprovedCreate").style.display = 'block';
				}
			} 
		}
	});

}

function loadApprovedOrgs() {
	
		$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "loadApprovedOrgs"
		},
		success: function(data) {
			var parsedData = JSON.parse(data);
			var orgs = parsedData;
			oLen = orgs.length;
			
			if(oLen == 0) {
				document.getElementById("orgsListBox").innerHTML = "<h4>No organizations need approval.</h4>";
			}
			else {
				
				var text = "<h4>Organizations awaiting approval:</h4>";
				text += "<div class=\"list-group\">"
				
				for (i = 0; i < oLen; i++) {
				
					text += "<button type=\"button\" id=\"" + orgs[i][0] + "\"class=\"list-group-item\""; 
					text += "data-toggle= \"modal\" data-target=\"#updateModal\"";
					text += "onclick=\"populateUpdateFaiths();populateUpdateStates(); hideUpdateMessage();loadUpdateModalData(" + orgs[i][0] + ");\">";
					text +=  "" + orgs[i][1] + "</button>";
					
				}
				text += "</div>";
				document.getElementById("orgsListBox").innerHTML = text;
			}


		}
	});
	
	
	
/*	
	var text = "";
	text += "<div class=\"list-group\">"
	text += "<button type=\"button\" class=\"list-group-item\">Cras justo odio</button>";
	text += "<button type=\"button\" class=\"list-group-item\">Dapibus ac facilisis in</button>";
	text += "<button type=\"button\" class=\"list-group-item\">Morbi leo risus</button>";
	text += "<button type=\"button\" class=\"list-group-item\">Porta ac consectetur ac</button>";
	text += "<button type=\"button\" class=\"list-group-item\">Vestibulum at eros</button>";
	text += "</div>";
	
	document.getElementById("orgsListBox").innerHTML = text;
	
	<button type="button" id=OrgID class=\"list-group-item\" data-toggle= \"modal\" data-target=\"#updateModal\"
	onclick=\"populateUpdateFaiths();populateUpdateStates(); hideUpdateMessage();loadUpdateModalData(" + orgs[i][0] + ");\">
	ORgName</button> */

}

function loadAdminPage() {
		$.ajax({
		url: '/PHP/htResourceHub.php',
		type: 'POST',
		data: {
			method: "checkIfLoggedIn"
		},
		success: function(data) {
			if(data == "false") {
				document.getElementById("adminError").style.display = 'block';
				document.getElementById("adminPanel").style.display = 'none';
				var text = "<div class=\"panel panel-default\">";
            		text += "<div class=\"panel-body\">";
            		text += "<div class=\"row\"><div class=\"col-md-5 col-md-offset 1\">";
            		text += "<h5>You are not logged in. Please login to an approved username to view this page</h5>";
            		text += "</div></div></div></div>";
					document.getElementById("adminError").innerHTML = text;
			}
			if(data == "admin1") {
				document.getElementById("adminError").style.display = 'none';
				document.getElementById("adminPanel").style.display = 'block';
				document.getElementById("admin1Msg").innerHTML = "<h5>With the login credentials you provided, you have access to view all confidential organizations in the system. To view those, simply use the search feature on the homepage. You also have the ability to insert new organizations with an approved status. This can be done clicking the Insert New Organization button below. You also may change the passwords to this account as well as the admin2 account using the Change Password button near the bottom of the page. Additionally, the list below are organizations that have been requested to be added to your site and need approval before they can be displayed in the search on the main page. To approve these organizations, please click the organization's name below that you wish to approve and select the Approve Organization checkbox at the bottom of the pop-up form that gets displayed.</h5>";
				document.getElementById("admin1CreateBtn").innerHTML = "<button type=\"button\" class=\"btn btn-default btn-md\" data-toggle=\"modal\" data-target=\"#createModal\" onclick=\"populateCreateFaiths(); hideCreateMessage(); populateCreateStates(); resetCreateModal();\">Insert New Organization</button>";
				document.getElementById("passwordChange").innerHTML = "<button type=\"button\" class=\"btn btn-default btn-md\" data-toggle=\"modal\" data-target=\"#changePasswordModal\" onclick=\"resetChangePassword();\">Change Password</button>";
				loadApprovedOrgs();
					
					
			}
			if(data == "admin2") {
				document.getElementById("adminError").style.display = 'none';
				document.getElementById("adminPanel").style.display = 'block';
				document.getElementById("admin2Msg").innerHTML = "<h5>With the login credentials you provided, you have read-only access to all confidential organizations in the system. To view organizations, simply use the search feature on the homepage.</h2>";
				document.getElementById("admin2CreateBtn").innerHTML = "<button type=\"button\" class=\"btn btn-default btn-md\" data-toggle=\"modal\" data-target=\"#createModal\" onclick=\"populateCreateFaiths(); hideCreateMessage(); populateCreateStates(); resetCreateModal();\">Insert New Organization</button>";
			}

		}
	});		
}

function loadSimpleData(orgs) {
	

	oLen = orgs.length;
	
	if(oLen == 0) {
		var text = "<h2>No results found</h2>";
				document.getElementById("resultPanel").innerHTML = text;
	}
	else{

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
		
		var checkUsername = localStorage.getItem("username");
		
		if(loggedIn == "true" && checkUsername == "admin1") {

		text += "<button id=" + orgs[i][0] + " type=\"button\" class=\"updOrgButton btn btn-default btn-lg\" data-toggle= \"modal\" data-target=\"#updateModal\" onclick=\"populateUpdateFaiths();populateUpdateStates(); hideUpdateMessage();loadUpdateModalData(" + orgs[i][0] + ");\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>";
		text += "<button id=" + orgs[i][0] + " type=\"button\" class=\"delOrgButton btn btn-default btn-lg\" data-toggle= \"modal\" data-target=\"#deleteModal\" onclick=\"loadDeleteData(" + orgs[i][0] + ");\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>";
		
		}
		
		text += "</div> </div>";




		text += "</div> </div>";

		document.getElementById("resultPanel").innerHTML = text;


	}
}


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
		
		var isApproved = document.getElementById("cbIsApprovedCreate").checked;
	
	
	//test the input
	if(createFormValidation()){
	
	
		/**format phone nums**/

		
					
					contactPhoneNum = contactPhoneNum.replace(/[^\/\d]/g,'');
					contactPhoneExt = contactPhoneExt.replace(/[^\/\d]/g,'');
					phoneNum = phoneNum.replace(/[^\/\d]/g,'');
					phoneExt = phoneExt.replace(/[^\/\d]/g,'');
					hotlineNum = hotlineNum.replace(/[^\/\d]/g,'');
					confNum = confNum.replace(/[^\/\d]/g,'');
					confExt = confExt.replace(/[^\/\d]/g,'');

		
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
				multi: multi.toString(),
				
	
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
				otherDesc: otherDesc,
				
				isApproved: isApproved.toString()
				
			},
			success: function(data) {
				
				showCreateMessage(data);
				document.getElementById("generalCreateErrorText").innerHTML = "";
				console.log("connection to php for insert working");
				console.log("org id for tyler: " + data);
			//	resetCreateModal();
	
			}
		});
	}



loadApprovedOrgs();


}

function resetCreateModal(){
			/**Organization Table Insert Data **/
	
		document.getElementById("txtOrgNameCreate").value = "";
		document.getElementById("txtOrgProgramCreate").value = "";
		document.getElementById("txtMissionStatementCreate").value = "";
		document.getElementById("txtOrgWebsiteCreate").value = "";
		document.getElementById("txtOrgEmailCreate").value = "";
		document.getElementById("txtMainPhoneCreate").value = "";
		document.getElementById("txtMainPhoneExtCreate").value = "";
		document.getElementById("txtHotlineCreate").value = "";
		document.getElementById("txtConfPhoneCreate").value = "";
		document.getElementById("txtConfPhoneExtCreate").value = "";
		document.getElementById("cbShelterCreate").checked = false;
		document.getElementById("cbTransitionalHousingCreate").checked = false;
		document.getElementById("cbAssistLocateHousingCreate").checked = false;
		document.getElementById("txtAssociatedFeeCreate").value = 0;
		document.getElementById("ddlFaithCreate").value = "All";
		document.getElementById("txtNoteCreate").value = "";
		document.getElementById("txtConfidentialNoteCreate").value = "";
		document.getElementById("cbIsConfCreate").checked = false;
	
	
		/**Addresses Table Insert Data**/
		document.getElementById("txtAddress1StreetCreate").value = "";
		document.getElementById("txtAddress1CityCreate").value = "";
		document.getElementById("txtAddress1ZipCreate").value = "";
		document.getElementById("txtAddress1CountyCreate").value = "";
		document.getElementById("ddlAddress1StateCreate").value = "-----";
	
		document.getElementById("txtAddress2StreetCreate").value = "";
		document.getElementById("txtAddress2CityCreate").value = "";
		document.getElementById("txtAddress2ZipCreate").value = "";
		document.getElementById("txtAddress2CountyCreate").value = "";
		document.getElementById("ddlAddress2StateCreate").value = "-----";
	
		document.getElementById("txtConfAddressStreetCreate").value = "";
		document.getElementById("txtConfAddressCityCreate").value = "";
		document.getElementById("txtConfAddressZipCreate").value = "";
		document.getElementById("txtConfAddressCountyCreate").value = "";
		document.getElementById("ddlConfAddressStateCreate").value = "-----";
	
	
		/**Age Table Insert Data**/
		document.getElementById("cbInfantCreate").checked = false;
		document.getElementById("cbChildCreate").checked = false;
		document.getElementById("cbYouthCreate").checked = false;
		document.getElementById("cbAdultCreate").checked = false;
	
		/**Contact Table Insert Data**/
		document.getElementById("txtPrimaryContactEmailCreate").value = "";
		document.getElementById("txtPrimaryContactFirstNameCreate").value = "";
		document.getElementById("txtPrimaryContactLastNameCreate").value = "";
		document.getElementById("txtPrimaryContactPosCreate").value = "";
		document.getElementById("txtPrimaryContactPhoneCreate").value = "";
		document.getElementById("txtPrimaryContactExtCreate").value = "";
		document.getElementById("cbContactIsConfCreate").checked = false;
	
		/**Ethnicity Table Insert Data**/
		document.getElementById("cbHispanicCreate").checked = false;
		document.getElementById("cbNonHispanicCreate").checked = false;
	
		/**Gender Table Insert Data**/
		document.getElementById("cbMaleCreate").checked = false;
		document.getElementById("cbFemaleCreate").checked = false;
		document.getElementById("cbTransCreate").checked = false;
	
		/**Hours Table Insert Data**/
		document.getElementById("cbIs247Create").checked = false;
	
		document.getElementById("ddlGenFullWeekStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekEndTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSatStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSatEndTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSunStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSunEndTimeCreate").value = "-----";
		document.getElementById("ddlGenMondayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenMondayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenTuesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenTuesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenWednesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenWednesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenThursdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenThursdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenFridayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFridayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenSaturdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenSaturdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenSundayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenSundayEndTimeCreate").value = "-----";
	
		document.getElementById("ddlAddFullWeekStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekEndTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSatStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSatEndTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSunStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSunEndTimeCreate").value = "-----";
		document.getElementById("ddlAddMondayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddMondayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddTuesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddTuesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddWednesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddWednesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddThursdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddThursdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddFridayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFridayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddSaturdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddSaturdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddSundayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddSundayEndTimeCreate").value = "-----";
		document.getElementById("txtAddHoursDescCreate").value = "";
		
		document.getElementById("ddlGenFullWeekStartTimeCreate").disabled = false;
		document.getElementById("ddlGenFullWeekEndTimeCreate").disabled = false;
		document.getElementById("ddlGenFullWeekSatStartTimeCreate").disabled = false;
		document.getElementById("ddlGenFullWeekSatEndTimeCreate").disabled = false;
		document.getElementById("ddlGenFullWeekSunStartTimeCreate").disabled = false;
		document.getElementById("ddlGenFullWeekSunEndTimeCreate").disabled = false;
		document.getElementById("ddlGenMondayStartTimeCreate").disabled = false;
		document.getElementById("ddlGenMondayEndTimeCreate").disabled = false;
		document.getElementById("ddlGenTuesdayStartTimeCreate").disabled = false;
		document.getElementById("ddlGenTuesdayEndTimeCreate").disabled = false;
		document.getElementById("ddlGenWednesdayStartTimeCreate").disabled = false;
		document.getElementById("ddlGenWednesdayEndTimeCreate").disabled = false;
		document.getElementById("ddlGenThursdayStartTimeCreate").disabled = false;
		document.getElementById("ddlGenThursdayEndTimeCreate").disabled = false;
		document.getElementById("ddlGenFridayStartTimeCreate").disabled = false;
		document.getElementById("ddlGenFridayEndTimeCreate").disabled = false;
		document.getElementById("ddlGenSaturdayStartTimeCreate").disabled = false;
		document.getElementById("ddlGenSaturdayEndTimeCreate").disabled = false;
		document.getElementById("ddlGenSundayStartTimeCreate").disabled = false;
		document.getElementById("ddlGenSundayEndTimeCreate").disabled = false;
				
		document.getElementById("ddlAddFullWeekStartTimeCreate").disabled = false;
		document.getElementById("ddlAddFullWeekEndTimeCreate").disabled = false;
		document.getElementById("ddlAddFullWeekSatStartTimeCreate").disabled = false;
		document.getElementById("ddlAddFullWeekSatEndTimeCreate").disabled = false;
		document.getElementById("ddlAddFullWeekSunStartTimeCreate").disabled = false;
		document.getElementById("ddlAddFullWeekSunEndTimeCreate").disabled = false;
					
		document.getElementById("ddlAddMondayStartTimeCreate").disabled = false;
		document.getElementById("ddlAddMondayEndTimeCreate").disabled = false;
		document.getElementById("ddlAddTuesdayStartTimeCreate").disabled = false;
		document.getElementById("ddlAddTuesdayEndTimeCreate").disabled = false;
		document.getElementById("ddlAddWednesdayStartTimeCreate").disabled = false;
		document.getElementById("ddlAddWednesdayEndTimeCreate").disabled = false;
		document.getElementById("ddlAddThursdayStartTimeCreate").disabled = false;
		document.getElementById("ddlAddThursdayEndTimeCreate").disabled = false;
		document.getElementById("ddlAddFridayStartTimeCreate").disabled = false;
		document.getElementById("ddlAddFridayEndTimeCreate").disabled = false;
		document.getElementById("ddlAddSaturdayStartTimeCreate").disabled = false;
		document.getElementById("ddlAddSaturdayEndTimeCreate").disabled = false;
		document.getElementById("ddlAddSundayStartTimeCreate").disabled = false;
		document.getElementById("ddlAddSundayEndTimeCreate").disabled = false; 
				
	
	
		/**Nationality Table Insert Data **/
		document.getElementById("cbDomesticCreate").checked = false;
		document.getElementById("cbForeignCreate").checked = false;
		document.getElementById("cbUndocumentedCreate").checked = false;
	
		/**Race Table Insert Data **/
		document.getElementById("cbBlackCreate").checked = false;
		document.getElementById("cbAsianCreate").checked = false;
		document.getElementById("cbWhiteCreate").checked = false;
		document.getElementById("cbHispanicLatinoCreate").checked = false;
		document.getElementById("cbNativeCreate").checked = false;
		document.getElementById("cbMultiRacialCreate").checked = false;
	
		/**Requirements Table Insert Data **/
		document.getElementById("cbMembershipCreate").checked = false;
		document.getElementById("txtMembershipCreate").value = "";
		document.getElementById("cbTrainingCreate").checked = false;
		document.getElementById("txtTrainingCreate").value = "";
		document.getElementById("cbApplicationCreate").checked = false;
		document.getElementById("txtApplicationCreate").value = "";
		document.getElementById("cbRestrictionCreate").checked = false;
		document.getElementById("txtRestrictionCreate").value = "";
	
		/**Service Table Insert Data **/
	
		document.getElementById("cbClothingServCreate").checked = false;
		document.getElementById("cbClothingSupplyCreate").checked = false;
		document.getElementById("cbClothingEmergRespCreate").checked = false;
		document.getElementById("txtClothingDescCreate").value = "";
	
		document.getElementById("cbFoodServCreate").checked = false;
		document.getElementById("cbFoodSupplyCreate").checked = false;
		document.getElementById("cbFoodEmergRespCreate").checked = false;
		document.getElementById("txtFoodDescCreate").value = "";
	
		document.getElementById("cbEmploymentServCreate").checked = false;
		document.getElementById("cbEmploymentSupplyCreate").checked = false;
		document.getElementById("cbEmploymentEmergRespCreate").checked = false;
		document.getElementById("txtEmploymentDescCreate").value = "";
	
		document.getElementById("cbMentoringServCreate").checked = false;
		document.getElementById("cbMentoringSupplyCreate").checked = false;
		document.getElementById("cbMentoringEmergRespCreate").checked = false;
		document.getElementById("txtMentoringDescCreate").value = "";
	
		document.getElementById("cbCounselServCreate").checked = false;
		document.getElementById("cbCounselServCreate").checked = false;
		document.getElementById("cbCounselServCreate").checked = false;
		document.getElementById("txtCounselDescCreate").value = "";
	
		document.getElementById("cbPregnancyServCreate").checked = false;
		document.getElementById("cbPregnancySupplyCreate").checked = false;
		document.getElementById("cbPregnancyEmergRespCreate").checked = false;
		document.getElementById("txtPregnancyDescCreate").value = "";
	
		document.getElementById("cbMedicalServCreate").checked = false;
		document.getElementById("cbMedicalSupplyCreate").checked = false;
		document.getElementById("cbMedicalEmergRespCreate").checked = false;
		document.getElementById("txtMedicalDescCreate").value = "";
	
		document.getElementById("cbLegalServCreate").checked = false;
		document.getElementById("cbLegalSupplyCreate").checked = false;
		document.getElementById("cbLegalEmergRespCreate").checked = false;
		document.getElementById("txtLegalDescCreate").value = "";
	
		document.getElementById("cbGovServCreate").checked = false;
		document.getElementById("cbGovSupplyCreate").checked = false;
		document.getElementById("cbGovEmergRespCreate").checked = false;
		document.getElementById("txtGovDescCreate").valuev
	
		document.getElementById("cbInvestigationServCreate").checked = false;
		document.getElementById("cbInvestigationSupplyCreate").checked = false;
		document.getElementById("cbInvestigationEmergRespCreate").checked = false;
		document.getElementById("txtInvestigationDescCreate").value = "";
	
		document.getElementById("cbFosterServCreate").checked = false;
		document.getElementById("cbFosterSupplyCreate").checked = false;
		document.getElementById("cbFosterEmergRespCreate").checked = false;
		document.getElementById("txtFosterDescCreate").value = "";
	
		document.getElementById("cbAwarenessEdServCreate").checked = false;
		document.getElementById("cbAwarenessEdSupplyCreate").checked = false;
		document.getElementById("cbAwarenessEdEmergRespCreate").checked = false;
		document.getElementById("txtAwarenessEdDescCreate").value = "";
	
		document.getElementById("cbResponseTrainServCreate").checked = false;
		document.getElementById("cbResponseTrainSupplyCreate").checked = false;
		document.getElementById("cbResponseTrainEmergRespCreate").checked = false;
		document.getElementById("txtResponseTrainDescCreate").value = "";
	
		document.getElementById("cbSubstanceAbuseServCreate").checked = false;
		document.getElementById("cbSubstanceAbuseSupplyCreate").checked = false;
		document.getElementById("cbSubstanceAbuseEmergRespCreate").checked = false;
		document.getElementById("txtSubstanceAbuseDescCreate").value = "";
	
		document.getElementById("cbAdvocacyServCreate").checked = false;
		document.getElementById("cbAdvocacySupplyCreate").checked = false;
		document.getElementById("cbAdvocacyEmergRespCreate").checked = false;
		document.getElementById("txtAdvocacyDescCreate").value = "";
	
		document.getElementById("cbOtherServCreate").checked = false;
		document.getElementById("cbOtherSupplyCreate").checked = false;
		document.getElementById("cbOtherEmergRespCreate").checked = false;
		document.getElementById("txtOtherDescCreate").value = "";
		
		document.getElementById("cbIsApprovedCreate").checked = false;
		
		/* check all check boxes disabled */
		document.getElementById("cbClothingAllCreate").checked = false;
		document.getElementById("cbFoodAllCreate").checked = false;
		document.getElementById("cbHousingAllCreate").checked = false;
		document.getElementById("cbMentoringAllCreate").checked = false;
		document.getElementById("cbEmploymentAllCreate").checked = false;
		document.getElementById("cbCounselAllCreate").checked = false;
		document.getElementById("cbPregnancyAllCreate").checked = false;
		document.getElementById("cbMedicalAllCreate").checked = false;
		document.getElementById("cbLegalAllCreate").checked = false;
		document.getElementById("cbGovAllCreate").checked = false;
		document.getElementById("cbInvestigationAllCreate").checked = false;
		document.getElementById("cbFosterAllCreate").checked = false;
		document.getElementById("cbAwarenessEdAllCreate").checked = false;
		document.getElementById("cbResponseTrainAllCreate").checked = false;
		document.getElementById("cbSubstanceAbuseAllCreate").checked = false;
		document.getElementById("cbAdvocacyAllCreate").checked = false;
		document.getElementById("cbOtherAllCreate").checked = false;
		document.getElementById("cbGenderAllCreate").checked = false;
		document.getElementById("cbAgeAllCreate").checked = false;
		document.getElementById("cbNatAllCreate").checked = false;
		document.getElementById("cbRaceAllCreate").checked = false;
		document.getElementById("cbEthnicityAllCreate").checked = false;
		
		
		hideCreateMessage();
}

function updateOrganization() {
	/**Organization Table Insert Data **/

	var orgId = document.getElementById("updateId").value;
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
	var faith = document.getElementById("ddlFaithUpdate").value;
	var notes = document.getElementById("txtNoteUpdate").value;
	var confNotes = document.getElementById("txtConfidentialNoteUpdate").value;
	var isConf = document.getElementById("cbIsConfUpdate").checked;


	/**Addresses Table Insert Data**/
	var streetInfo1 = document.getElementById("txtAddress1StreetUpdate").value;
	var city1 = document.getElementById("txtAddress1CityUpdate").value;
	var zipcode1 = document.getElementById("txtAddress1ZipUpdate").value;
	var county1 = document.getElementById("txtAddress1CountyUpdate").value;
	var state1 = document.getElementById("ddlAddress1StateUpdate").value;

	var streetInfo2 = document.getElementById("txtAddress2StreetUpdate").value;
	var city2 = document.getElementById("txtAddress2CityUpdate").value;
	var zipcode2 = document.getElementById("txtAddress2ZipUpdate").value;
	var county2 = document.getElementById("txtAddress2CountyUpdate").value;
	var state2 = document.getElementById("ddlAddress2StateUpdate").value;

	var streetInfo3 = document.getElementById("txtConfAddressStreetUpdate").value;
	var city3 = document.getElementById("txtConfAddressCityUpdate").value;
	var zipcode3 = document.getElementById("txtConfAddressZipUpdate").value;
	var county3 = document.getElementById("txtConfAddressCountyUpdate").value;
	var state3 = document.getElementById("ddlConfAddressStateUpdate").value;


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

	var isApproved = document.getElementById("cbIsApprovedUpdate").checked;


	if(updateFormValidation()){
	console.log("Passed validation");
					contactPhoneNum = contactPhoneNum.replace(/[^\/\d]/g,'');
					contactPhoneExt = contactPhoneExt.replace(/[^\/\d]/g,'');
					phoneNum = phoneNum.replace(/[^\/\d]/g,'');
					phoneExt = phoneExt.replace(/[^\/\d]/g,'');
					hotlineNum = hotlineNum.replace(/[^\/\d]/g,'');
					confNum = confNum.replace(/[^\/\d]/g,'');
					confExt = confExt.replace(/[^\/\d]/g,'');
	console.log("simple search beginning worked")
	$.ajax({
		url: '/PHP/updateOrgAjax.php',
		type: 'POST',
		data: {
			method: "updateOrganization",

			/**Organization Table Data**/
			orgId : orgId,
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
			multi: multi.toString(),

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
			otherDesc: otherDesc,
			
			isApproved: isApproved.toString()
		},
		success: function(data) {
			showUpdateMessage(data);
			document.getElementById("generalUpdateErrorText").innerHTML = "";
			console.log("connection to php for insert working");
			console.log(data);
			loadApprovedOrgs();
			readAllOrgs();
			

		}
	});

}


}

function deleteOrganization() {
	  var orgId = document.getElementById('deleteID').value;
  
  	 $.ajax ({
		url: '/PHP/deleteOrg.php',
		type: 'POST',
		data: {method: "deleteOrganization", orgId: orgId},
		success: function(data){
	           console.log(data);
	     if(data == "Deleted") {
	    	document.getElementById("deleteText").style.display = "none";
			document.getElementById("deleteBtn").disabled = true;
			text = "<h5>Delete successful</h5>";
			document.getElementById("deleteSuccessMsg").style.display = "block";
			document.getElementById("deleteSuccessMsg").innerHTML = text;
			readAllOrgs();
	     }
	     if(data == "Not Deleted") {
	    	document.getElementById("deleteText").style.display = "none";
			document.getElementById("deleteBtn").disabled = true;
			text = "<h5>Problem with deleting organization. Please try again later.</h5>";
			document.getElementById("deleteSuccessMsg").style.display = "block";
			document.getElementById("deleteSuccessMsg").innerHTML = text;
			readAllOrgs();
	     }
}
});
	

}

function loadDeleteData(orgId) {
		document.getElementById("deleteText").style.display = "block";
		document.getElementById("deleteBtn").disabled = false;
		document.getElementById("deleteSuccessMsg").style.display = "none";
	
	console.log(orgId);
	
	$.ajax ({
		url: '/PHP/deleteOrg.php',
		type: 'POST',
		data: {method: "readDeleteOrgId", orgId: orgId},
		success: function(data){
	           console.log(data);
	           
	               
      var parsedData = JSON.parse(data);
      var orgs = parsedData;
    
    document.getElementById('deleteID').value = orgs[0][0];
    
	text = "Are you sure you want to delete " + orgs[0][1] + "?";
	document.getElementById("deleteText").innerHTML = text;

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
							document.getElementById("ddlGenFullWeekStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenFullWeekEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenFullWeekSatStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenFullWeekSatEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenFullWeekSunStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenFullWeekSunEndTimeUpdate").disabled = true;
					
				document.getElementById("ddlGenMondayStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenMondayEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenTuesdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenTuesdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenWednesdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenWednesdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenThursdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenThursdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenFridayStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenFridayEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenSaturdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenSaturdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlGenSundayStartTimeUpdate").disabled = true;
				document.getElementById("ddlGenSundayEndTimeUpdate").disabled = true;
				
				document.getElementById("ddlAddFullWeekStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddFullWeekEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddFullWeekSatStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddFullWeekSatEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddFullWeekSunStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddFullWeekSunEndTimeUpdate").disabled = true;
					
				document.getElementById("ddlAddMondayStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddMondayEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddTuesdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddTuesdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddWednesdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddWednesdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddThursdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddThursdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddFridayStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddFridayEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddSaturdayStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddSaturdayEndTimeUpdate").disabled = true;
				document.getElementById("ddlAddSundayStartTimeUpdate").disabled = true;
				document.getElementById("ddlAddSundayEndTimeUpdate").disabled = true; 
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
								
										
								document.getElementById("ddlGenMondayStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenMondayEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenTuesdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenTuesdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenWednesdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenWednesdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenThursdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenThursdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenFridayStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenFridayEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenSaturdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenSaturdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenSundayStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenSundayEndTimeUpdate").disabled = true;
								
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
								
								document.getElementById("ddlGenFullWeekStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenFullWeekEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenFullWeekSatStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenFullWeekSatEndTimeUpdate").disabled = true;
								document.getElementById("ddlGenFullWeekSunStartTimeUpdate").disabled = true;
								document.getElementById("ddlGenFullWeekSunEndTimeUpdate").disabled = true;
								
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
								
								
								document.getElementById("ddlAddMondayStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddMondayEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddTuesdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddTuesdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddWednesdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddWednesdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddThursdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddThursdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddFridayStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddFridayEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddSaturdayStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddSaturdayEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddSundayStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddSundayEndTimeUpdate").disabled = true; 
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
								
								document.getElementById("ddlAddFullWeekStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddFullWeekEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddFullWeekSatStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddFullWeekSatEndTimeUpdate").disabled = true;
								document.getElementById("ddlAddFullWeekSunStartTimeUpdate").disabled = true;
								document.getElementById("ddlAddFullWeekSunEndTimeUpdate").disabled = true;
								
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
			
			document.getElementById("updateId").value = "";
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
			
			document.getElementById("cbIsApprovedUpdate").checked = false;
			
			
			
			oLen = orgs.length;
			for (i = 0; i < oLen; i++) {
				
				document.getElementById("updateId").value = orgs[i][0];
				
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
				
				if(orgs[i][16] == 1) {
						document.getElementById("cbIsApprovedUpdate").checked = true;
				}
		
			
	
			
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
					document.getElementById("cbHispanicLatinoUpdate").checked = true;
					document.getElementById("cbNativeUpdate").checked = true;
					document.getElementById("cbMultiRacialUpdate").checked = true;
					document.getElementById("cbWhiteUpdate").disabled = true;
					document.getElementById("cbBlackUpdate").disabled = true;
					document.getElementById("cbAsianUpdate").disabled = true;
					document.getElementById("cbHispanicLatinoUpdate").disabled = true;
					document.getElementById("cbNativeUpdate").disabled = true;
					document.getElementById("cbMultiRacialUpdate").disabled = true;
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
					if (raceData[i] == "American Indian or Alaska Native") {
					document.getElementById("cbNativeUpdate").checked = true;
					}
					if (raceData[i] == "Multi-Racial") {
					document.getElementById("cbMultiRacialUpdate").checked = true;
					}
					if (raceData[i] == "Hispanic/Latino") {
					document.getElementById("cbHispanicLatinoUpdate").checked = true;
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

// Create Hours Validation
function checkHoursCreate() {
	if (document.getElementById("cbIs247Create").checked){
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
	};
}

function checkHoursUpdate() {
	
	if (document.getElementById("cbIs247Update").checked){
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
	};
}

function disableRegularHoursCreate() {
            
        if(document.getElementById("ddlGenFullWeekStartTimeCreate").value != "-----" || document.getElementById("ddlGenFullWeekEndTimeCreate").value != "-----" || 
        document.getElementById("ddlGenFullWeekSatStartTimeCreate").value != "-----" || document.getElementById("ddlGenFullWeekSatEndTimeCreate").value != "-----" ||
        document.getElementById("ddlGenFullWeekSunStartTimeCreate").value != "-----" || document.getElementById("ddlGenFullWeekSunEndTimeCreate").value != "-----") {
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
	};
}

function disableAdditionalHoursCreate(){
	    
        if(document.getElementById("ddlAddFullWeekStartTimeCreate").value != "-----" || document.getElementById("ddlAddFullWeekEndTimeCreate").value != "-----" || 
        document.getElementById("ddlAddFullWeekSatStartTimeCreate").value != "-----" || document.getElementById("ddlAddFullWeekSatEndTimeCreate").value != "-----" ||
        document.getElementById("ddlAddFullWeekSunStartTimeCreate").value != "-----" || document.getElementById("ddlAddFullWeekSunEndTimeCreate").value != "-----") {
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
	}
	
function checkGenHourOverlap(){
		if(document.getElementById("ddlGenMondayStartTimeCreate").value != "-----" || document.getElementById("ddlGenMondayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlGenTuesdayStartTimeCreate").value != "-----" || document.getElementById("ddlGenTuesdayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlGenWednesdayStartTimeCreate").value != "-----" || document.getElementById("ddlGenWednesdayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlGenThursdayStartTimeCreate").value != "-----" || document.getElementById("ddlGenThursdayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlGenFridayStartTimeCreate").value != "-----" || document.getElementById("ddlGenFridayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlGenSaturdayStartTimeCreate").value != "-----" || document.getElementById("ddlGenSaturdayStartTimeCreate").value != "-----" ||
		document.getElementById("ddlGenSundayStartTimeCreate").value != "-----" || document.getElementById("ddlGenSundayEndTimeCreate").value != "-----"){
		$("#ddlGenFullWeekStartTimeCreate").prop("disabled", true);
		$("#ddlGenFullWeekEndTimeCreate").prop("disabled", true);
		$("#ddlGenFullWeekSatStartTimeCreate").prop("disabled", true);
		$("#ddlGenFullWeekSatEndTimeCreate").prop("disabled", true);
		$("#ddlGenFullWeekSunStartTimeCreate").prop("disabled", true);
		$("#ddlGenFullWeekSunEndTimeCreate").prop("disabled", true);
		}else
		{
		$("#ddlGenFullWeekStartTimeCreate").prop("disabled", false);
		$("#ddlGenFullWeekEndTimeCreate").prop("disabled", false);
		$("#ddlGenFullWeekSatStartTimeCreate").prop("disabled", false);
		$("#ddlGenFullWeekSatEndTimeCreate").prop("disabled", false);
		$("#ddlGenFullWeekSunStartTimeCreate").prop("disabled", false);
		$("#ddlGenFullWeekSunEndTimeCreate").prop("disabled", false);
			}
	}
	
function checkAddHourOverLap(){
		if(document.getElementById("ddlAddMondayStartTimeCreate").value != "-----" || document.getElementById("ddlAddMondayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlAddTuesdayStartTimeCreate").value != "-----" || document.getElementById("ddlAddTuesdayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlAddWednesdayStartTimeCreate").value != "-----" || document.getElementById("ddlAddWednesdayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlAddThursdayStartTimeCreate").value != "-----" || document.getElementById("ddlAddThursdayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlAddFridayStartTimeCreate").value != "-----" || document.getElementById("ddlAddFridayEndTimeCreate").value != "-----" ||
		document.getElementById("ddlAddSaturdayStartTimeCreate").value != "-----" || document.getElementById("ddlAddSaturdayStartTimeCreate").value != "-----" ||
		document.getElementById("ddlAddSundayStartTimeCreate").value != "-----" || document.getElementById("ddlAddSundayEndTimeCreate").value != "-----"){
		$("#ddlAddFullWeekStartTimeCreate").prop("disabled", true);
		$("#ddlAddFullWeekEndTimeCreate").prop("disabled", true);
		$("#ddlAddFullWeekSatStartTimeCreate").prop("disabled", true);
		$("#ddlAddFullWeekSatEndTimeCreate").prop("disabled", true);
		$("#ddlAddFullWeekSunStartTimeCreate").prop("disabled", true);
		$("#ddlAddFullWeekSunEndTimeCreate").prop("disabled", true);
		}else
		{
		$("#ddlAddFullWeekStartTimeCreate").prop("disabled", false);
		$("#ddlAddFullWeekEndTimeCreate").prop("disabled", false);
		$("#ddlAddFullWeekSatStartTimeCreate").prop("disabled", false);
		$("#ddlAddFullWeekSatEndTimeCreate").prop("disabled", false);
		$("#ddlAddFullWeekSunStartTimeCreate").prop("disabled", false);
		$("#ddlAddFullWeekSunEndTimeCreate").prop("disabled", false);
			}
	}
	
function resetHours(){
	
	if (document.getElementById("cbIs247Create").checked){
		document.getElementById("ddlGenFullWeekStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekEndTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSatStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSatEndTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSunStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFullWeekSunEndTimeCreate").value = "-----";
		document.getElementById("ddlGenMondayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenMondayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenTuesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenTuesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenWednesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenWednesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenThursdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenThursdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenFridayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenFridayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenSaturdayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenSaturdayEndTimeCreate").value = "-----";
		document.getElementById("ddlGenSundayStartTimeCreate").value = "-----";
		document.getElementById("ddlGenSundayEndTimeCreate").value = "-----";
		
		 document.getElementById("ddlAddFullWeekStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekEndTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSatStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSatEndTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSunStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFullWeekSunEndTimeCreate").value = "-----";
		document.getElementById("ddlAddMondayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddMondayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddTuesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddTuesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddWednesdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddWednesdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddThursdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddThursdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddFridayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddFridayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddSaturdayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddSaturdayEndTimeCreate").value = "-----";
		document.getElementById("ddlAddSundayStartTimeCreate").value = "-----";
		document.getElementById("ddlAddSundayEndTimeCreate").value = "-----";
	}
	else {
	
	}
}

//Update Hour Validation

function disableRegularHoursUpdate() {
            
        if(document.getElementById("ddlGenFullWeekStartTimeUpdate").value != "-----" || document.getElementById("ddlGenFullWeekEndTimeUpdate").value != "-----" || 
        document.getElementById("ddlGenFullWeekSatStartTimeUpdate").value != "-----" || document.getElementById("ddlGenFullWeekSatEndTimeUpdate").value != "-----" ||
        document.getElementById("ddlGenFullWeekSunStartTimeUpdate").value != "-----" || document.getElementById("ddlGenFullWeekSunEndTimeUpdate").value != "-----") {
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
	};
}

function disableAdditionalHoursUpdate(){
	    
        if(document.getElementById("ddlAddFullWeekStartTimeUpdate").value != "-----" || document.getElementById("ddlAddFullWeekEndTimeUpdate").value != "-----" || 
        document.getElementById("ddlAddFullWeekSatStartTimeUpdate").value != "-----" || document.getElementById("ddlAddFullWeekSatEndTimeUpdate").value != "-----" ||
        document.getElementById("ddlAddFullWeekSunStartTimeUpdate").value != "-----" || document.getElementById("ddlAddFullWeekSunEndTimeUpdate").value != "-----") {
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
	}
	
function checkGenHourOverlapUpdate(){
		if(document.getElementById("ddlGenMondayStartTimeUpdate").value != "-----" || document.getElementById("ddlGenMondayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlGenTuesdayStartTimeUpdate").value != "-----" || document.getElementById("ddlGenTuesdayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlGenWednesdayStartTimeUpdate").value != "-----" || document.getElementById("ddlGenWednesdayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlGenThursdayStartTimeUpdate").value != "-----" || document.getElementById("ddlGenThursdayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlGenFridayStartTimeUpdate").value != "-----" || document.getElementById("ddlGenFridayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlGenSaturdayStartTimeUpdate").value != "-----" || document.getElementById("ddlGenSaturdayStartTimeUpdate").value != "-----" ||
		document.getElementById("ddlGenSundayStartTimeUpdate").value != "-----" || document.getElementById("ddlGenSundayEndTimeUpdate").value != "-----"){
		$("#ddlGenFullWeekStartTimeUpdate").prop("disabled", true);
		$("#ddlGenFullWeekEndTimeUpdate").prop("disabled", true);
		$("#ddlGenFullWeekSatStartTimeUpdate").prop("disabled", true);
		$("#ddlGenFullWeekSatEndTimeUpdate").prop("disabled", true);
		$("#ddlGenFullWeekSunStartTimeUpdate").prop("disabled", true);
		$("#ddlGenFullWeekSunEndTimeUpdate").prop("disabled", true);
		}else
		{
		$("#ddlGenFullWeekStartTimeUpdate").prop("disabled", false);
		$("#ddlGenFullWeekEndTimeUpdate").prop("disabled", false);
		$("#ddlGenFullWeekSatStartTimeUpdate").prop("disabled", false);
		$("#ddlGenFullWeekSatEndTimeUpdate").prop("disabled", false);
		$("#ddlGenFullWeekSunStartTimeUpdate").prop("disabled", false);
		$("#ddlGenFullWeekSunEndTimeUpdate").prop("disabled", false);
			}
	}
	
function checkAddHourOverLapUpdate(){
		if(document.getElementById("ddlAddMondayStartTimeUpdate").value != "-----" || document.getElementById("ddlAddMondayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlAddTuesdayStartTimeUpdate").value != "-----" || document.getElementById("ddlAddTuesdayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlAddWednesdayStartTimeUpdate").value != "-----" || document.getElementById("ddlAddWednesdayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlAddThursdayStartTimeUpdate").value != "-----" || document.getElementById("ddlAddThursdayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlAddFridayStartTimeUpdate").value != "-----" || document.getElementById("ddlAddFridayEndTimeUpdate").value != "-----" ||
		document.getElementById("ddlAddSaturdayStartTimeUpdate").value != "-----" || document.getElementById("ddlAddSaturdayStartTimeUpdate").value != "-----" ||
		document.getElementById("ddlAddSundayStartTimeUpdate").value != "-----" || document.getElementById("ddlAddSundayEndTimeUpdate").value != "-----"){
		$("#ddlAddFullWeekStartTimeUpdate").prop("disabled", true);
		$("#ddlAddFullWeekEndTimeUpdate").prop("disabled", true);
		$("#ddlAddFullWeekSatStartTimeUpdate").prop("disabled", true);
		$("#ddlAddFullWeekSatEndTimeUpdate").prop("disabled", true);
		$("#ddlAddFullWeekSunStartTimeUpdate").prop("disabled", true);
		$("#ddlAddFullWeekSunEndTimeUpdate").prop("disabled", true);
		}else
		{
		$("#ddlAddFullWeekStartTimeUpdate").prop("disabled", false);
		$("#ddlAddFullWeekEndTimeUpdate").prop("disabled", false);
		$("#ddlAddFullWeekSatStartTimeUpdate").prop("disabled", false);
		$("#ddlAddFullWeekSatEndTimeUpdate").prop("disabled", false);
		$("#ddlAddFullWeekSunStartTimeUpdate").prop("disabled", false);
		$("#ddlAddFullWeekSunEndTimeUpdate").prop("disabled", false);
			}
	}
	
function resetHoursUpdate(){
	
	if (document.getElementById("cbIs247Update").checked){
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
	}
	else {
	
	}
}

function checkAllDisableCreate(source) {
	var checkAlls = document.getElementsByTagName('input');
        for (var i=0;i<checkAlls.length;i++) {
            if (checkAlls[i] != source && checkAlls[i].className == source.className) {
                checkAlls[i].disabled = source.checked;
                checkAlls[i].checked = source.checked;
            }
    	}
}

function checkAllDisableUpdate(source) {
	
	var checkAlls = document.getElementsByTagName('input');
        for (var i=0;i<checkAlls.length;i++) {
            if (checkAlls[i] != source && checkAlls[i].className == source.className) {
                checkAlls[i].disabled = source.checked;
                checkAlls[i].checked = source.checked;
            }
    	}
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

function displayDeleteModal() {
	$.ajax({
  url: '/HTML/Modals/deleteModal.html',
  dataType: 'text',
  success: function(data) {
	document.getElementById("insertDeleteModal").innerHTML = data;
  }
});
}

function onLoadFunctions() {
	displayCreateModal();
	displayUpdateModal();
	displayLoginModal();
	displayDeleteModal()
	populateCreateStates();
	populateCreateFaiths();
	populateUpdateStates();
	populateUpdateFaiths();
	checkIfLoggedIn();
	loadAdminPage();
}

function indexLoad() {
		document.getElementById("allSearch").style.display= 'block';
		document.getElementById("orgInfoResults").style.display= 'none';
		readAllOrgs();
		show('advSearch');
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
	
		if(checkIfLoggedIn() == "false") {
			document.getElementById("orgInfoNotes").innerHTML = "<p>" + organizations[0][13] + "</p>";
			document.getElementById("orgInfoConfNotes").innerHTML = "<p></p>";
		}
		else {
			document.getElementById("orgInfoNotes").innerHTML = "<p>" + organizations[0][13] + "</p>";
			document.getElementById("orgInfoConfNotes").innerHTML = "<p>" + organizations[0][14] + "</p>";
		}
		
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
		
		var checkUsername = localStorage.getItem("username");
		
		if(loggedIn == "true" && checkUsername == "admin1") {
		document.getElementById("updDelBtns").innerHTML = "<button id=" + organizations[0][0] + " type=\"button\" class=\"updOrgButton btn btn-default btn-lg\" data-toggle= \"modal\" data-target=\"#updateModal\" onclick=\"populateUpdateFaiths();populateUpdateStates(); hideUpdateMessage();loadUpdateModalData(" + organizations[0][0] + ");\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>" +
		"<button id=" + organizations[0][0] + " type=\"button\" class=\"delOrgButton btn btn-default btn-lg\" data-toggle= \"modal\" data-target=\"#deleteModal\" onclick=\"loadDeleteData(" + organizations[0][0] + ");\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>";
		}

	
		
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
				if(services[i][2] != 0){
					if(count == 0){
						text += " (Service";
						count ++;
					}
					else{
						text += ", Service";
					}
				}
				if(services[i][3] != 0){
					if(count == 0){
						text += " (Supply";
						count ++;
					}
					else{
						text += ", Supply";
					}
				}
				if(services[i][4] != 0){
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
			document.getElementById("backButton").focus();
			}
		}); 
}

function createFormValidation(){
	
	//***General Organization Information
	var orgErrorFound = false;
	var genInfoError = "";
	
	//Check for org name
	if(document.getElementById("txtOrgNameCreate").value == ""){
		genInfoError = "Please enter an Organization name.";
		document.getElementById("txtOrgNameCreate").focus();
		orgErrorFound = true;
	}



	//***Contact Information***
	var contactErrorFound = false;
	var contactInfoError = "";
	
	//Check for a main phone number
	if(document.getElementById("txtMainPhoneCreate").value == ""){
		contactInfoError = "Please enter a main phone number"
		document.getElementById("txtMainPhoneCreate").focus();
		contactErrorFound = true;
	}
	
	//validate main phone
	
	
	//validate hotline phone
	
	//validate confidential phone
	
	//validate contact number
	
	
	
	
	//Checks for email, if blank must be N/A
	if(document.getElementById("txtOrgEmailCreate").value == ""){
		if(contactErrorFound == false){
			contactInfoError += "Please enter N/A if there is no organization email"
		}
		else{
			contactInfoError += "<br>Please enter N/A if there is no organization email"
		}
		document.getElementById("txtOrgEmailCreate").focus();
		contactErrorFound = true;
	}
	
	//Checks for @. in the org email
	if(!document.getElementById("txtOrgEmailCreate").value.includes("@") & document.getElementById("txtOrgEmailCreate").value != "N/A"){
		if(contactErrorFound == false){
			contactInfoError = "Please enter a valid organization email"
		}
		else{
			contactInfoError += "<br>Please enter a valid organization email"
		}
		document.getElementById("txtOrgEmailCreate").focus();
		contactErrorFound = true;
	}
	
	//Checks for @. in the contact email
	if(!document.getElementById("txtPrimaryContactEmailCreate").value.includes("@") & document.getElementById("txtPrimaryContactEmailCreate").value != ""){
		if(contactErrorFound == false){
			contactInfoError = "Please enter a valid contact email"
		}
		else{
			contactInfoError += "<br>Please enter a valid contact email"
		}
		document.getElementById("txtPrimaryContactEmailCreate").focus();
		contactErrorFound = true;
	}
	
	
	
	//***Address Information***
	var addressErrorFound = false;
	var addressInfoError = "";
	
	//Check for one full address
	if(document.getElementById("txtAddress1StreetCreate").value == "" || document.getElementById("txtAddress1CityCreate").value == "" || document.getElementById("txtAddress1ZipCreate").value == "" || document.getElementById("ddlAddress1StateCreate").value == "-----" ){
		addressInfoError = "Please enter at least one full address"
		document.getElementById("txtAddress1StreetCreate").focus();
		addressErrorFound = true;
	}
	//Check zip for all numbers
	if(isNaN(document.getElementById("txtAddress1ZipCreate").value) || document.getElementById("txtAddress1ZipCreate").value.length > 5 || document.getElementById("txtAddress1ZipCreate").value.length < 5){
		if(addressErrorFound){
			addressInfoError += "<br>";
		}
		addressInfoError += "Please enter a valid Zip in Address 1"
		document.getElementById("txtAddress1ZipCreate").focus();
		addressErrorFound = true;
		
	}
		if(isNaN(document.getElementById("txtAddress2ZipCreate").value) || document.getElementById("txtAddress2ZipCreate").value.length > 5){
			if(addressErrorFound){
				addressInfoError += "<br>";
			}
		addressInfoError += "Please enter a valid Zip in Address 2"
		document.getElementById("txtAddress2ZipCreate").focus();
		addressErrorFound = true;
		}

		if(isNaN(document.getElementById("txtConfAddressZipCreate").value)  ||  document.getElementById("txtConfAddressZipCreate").value.length > 5){
			if(addressErrorFound){
			addressInfoError += "<br>";
			 }
		addressInfoError += "Please enter a valid Zip in confidential Address"
		document.getElementById("txtConfAddressZipCreate").focus();
		addressErrorFound = true;
		}
	
	
	
	
	//***Hours Information***
	var hourErrorFound = false;
	var hoursInfoError = "";
	
	//Checks to make sure something is selected in hours
	if(document.getElementById("ddlGenFullWeekStartTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenFullWeekSatStartTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekSatEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenFullWeekSunStartTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekSunEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenMondayStartTimeCreate").value == "-----" & document.getElementById("ddlGenMondayEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenTuesdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenTuesdayEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenWednesdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenWednesdayEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenThursdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenThursdayEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenFridayStartTimeCreate").value == "-----" & document.getElementById("ddlGenFridayEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenSaturdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenSaturdayEndTimeCreate").value == "-----"
		& document.getElementById("ddlGenSundayStartTimeCreate").value == "-----" & document.getElementById("ddlGenSundayEndTimeCreate").value == "-----"
		& document.getElementById("cbIs247Create").checked == false){
		
		hoursInfoError = "Please select at least one time";
		hoursErrorFound = true;
		document.getElementById("ddlGenFullWeekStartTimeCreate").focus();
	}
	
	//If there is a start time, there needs to be an end time, and vice versa
	if(document.getElementById("ddlGenFullWeekStartTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekEndTimeCreate").value != "-----"){
		hoursInfoError = "Please enter a start time for Monday - Friday";
		document.getElementById("ddlGenFullWeekStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFullWeekEndTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Monday - Friday";
		document.getElementById("ddlGenFullWeekEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenFullWeekSatStartTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekSatEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlGenFullWeekSatStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFullWeekSatEndTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekSatStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlGenFullWeekSatEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenFullWeekSunStartTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekSunEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlGenFullWeekSunStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFullWeekSunEndTimeCreate").value == "-----" & document.getElementById("ddlGenFullWeekSunStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlGenFullWeekSunEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenMondayStartTimeCreate").value == "-----" & document.getElementById("ddlGenMondayEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Monday";
		document.getElementById("ddlGenMondayStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenMondayEndTimeCreate").value == "-----" & document.getElementById("ddlGenMondayStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Monday";
		document.getElementById("ddlGenMondayEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenTuesdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenTuesdayEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Tuesday";
		document.getElementById("ddlGenTuesdayStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenTuesdayEndTimeCreate").value == "-----" & document.getElementById("ddlGenTuesdayStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Tuesday";
		document.getElementById("ddlGenTuesdayEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenWednesdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenWednesdayEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Wednesday";
		document.getElementById("ddlGenWednesdayStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenWednesdayEndTimeCreate").value == "-----" & document.getElementById("ddlGenWednesdayStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Wednesday";
		document.getElementById("ddlGenWednesdayEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenThursdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenThursdayEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Thursday";
		document.getElementById("ddlGenThursdayStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenThursdayEndTimeCreate").value == "-----" & document.getElementById("ddlGenThursdayStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Thursday";
		document.getElementById("ddlGenThursdayEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenFridayStartTimeCreate").value == "-----" & document.getElementById("ddlGenFridayEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Friday";
		document.getElementById("ddlGenFridayStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFridayEndTimeCreate").value == "-----" & document.getElementById("ddlGenFridayStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Friday";
		document.getElementById("ddlGenFridayEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenSaturdayStartTimeCreate").value == "-----" & document.getElementById("ddlGenSaturdayEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlGenSaturdayStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenSaturdayEndTimeCreate").value == "-----" & document.getElementById("ddlGenSaturdayStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlGenSaturdayEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenSundayStartTimeCreate").value == "-----" & document.getElementById("ddlGenSundayEndTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlGenSundayStartTimeCreate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenSundayEndTimeCreate").value == "-----" & document.getElementById("ddlGenSundayStartTimeCreate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlGenSundayEndTimeCreate").focus();
		hourErrorFound = true;
	}
	
	
	
	//***Additional Hours Information***
	var addHourErrorFound = false;
	var addHoursInfoError = "";
	
	//If there is a start time, there needs to be an end time, and vice versa
	if(document.getElementById("ddlAddFullWeekStartTimeCreate").value == "-----" & document.getElementById("ddlAddFullWeekEndTimeCreate").value != "-----"){
		addHoursInfoError = "Please enter a start time for Monday - Friday";
		document.getElementById("ddlAddFullWeekStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFullWeekEndTimeCreate").value == "-----" & document.getElementById("ddlAddFullWeekStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Monday - Friday";
		document.getElementById("ddlAddFullWeekEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddFullWeekSatStartTimeCreate").value == "-----" & document.getElementById("ddlAddFullWeekSatEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlAddFullWeekSatStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFullWeekSatEndTimeCreate").value == "-----" & document.getElementById("ddlAddFullWeekSatStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlAddFullWeekSatEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddFullWeekSunStartTimeCreate").value == "-----" & document.getElementById("ddlAddFullWeekSunEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlAddFullWeekSunStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFullWeekSunEndTimeCreate").value == "-----" & document.getElementById("ddlAddFullWeekSunStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlAddFullWeekSunEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddMondayStartTimeCreate").value == "-----" & document.getElementById("ddlAddMondayEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Monday";
		document.getElementById("ddlAddMondayStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddMondayEndTimeCreate").value == "-----" & document.getElementById("ddlAddMondayStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Monday";
		document.getElementById("ddlAddMondayEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddTuesdayStartTimeCreate").value == "-----" & document.getElementById("ddlAddTuesdayEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Tuesday";
		document.getElementById("ddlAddTuesdayStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddTuesdayEndTimeCreate").value == "-----" & document.getElementById("ddlAddTuesdayStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Tuesday";
		document.getElementById("ddlAddTuesdayEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddWednesdayStartTimeCreate").value == "-----" & document.getElementById("ddlAddWednesdayEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Wednesday";
		document.getElementById("ddlAddWednesdayStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddWednesdayEndTimeCreate").value == "-----" & document.getElementById("ddlAddWednesdayStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Wednesday";
		document.getElementById("ddlAddWednesdayEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddThursdayStartTimeCreate").value == "-----" & document.getElementById("ddlAddThursdayEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Thursday";
		document.getElementById("ddlAddThursdayStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddThursdayEndTimeCreate").value == "-----" & document.getElementById("ddlAddThursdayStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Thursday";
		document.getElementById("ddlAddThursdayEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddFridayStartTimeCreate").value == "-----" & document.getElementById("ddlAddFridayEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Friday";
		document.getElementById("ddlAddFridayStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFridayEndTimeCreate").value == "-----" & document.getElementById("ddlAddFridayStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Friday";
		document.getElementById("ddlAddFridayEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddSaturdayStartTimeCreate").value == "-----" & document.getElementById("ddlAddSaturdayEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlAddSaturdayStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddSaturdayEndTimeCreate").value == "-----" & document.getElementById("ddlAddSaturdayStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlAddSaturdayEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddSundayStartTimeCreate").value == "-----" & document.getElementById("ddlAddSundayEndTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlAddSundayStartTimeCreate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddSundayEndTimeCreate").value == "-----" & document.getElementById("ddlAddSundayStartTimeCreate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlAddSundayEndTimeCreate").focus();
		addHourErrorFound = true;
	}
	
	
	
	//***Resources Information***
	var resourceErrorFound = false;
	var resourcesInfoError = "";
	
	
	
	//***Other Resources Information***
	var otherResourceErrorFound = false;
	var otherResourcesInfoError = "";
	
	/*
	//If other is selected, it needs a description
	if(document.getElementById(("cbOtherAllCreate").checked == true || document.getElementById("cbOtherServCreate").checked == true || document.getElementById("cbOtherSupplyCreate").checked == true || document.getElementById("cbOtherEmergRespCreate").checked == true) & document.getElementById("txtOtherDescCreate").value == ""){
		otherResourcesInfoError = "Please enter a description for other";
		document.getElementById("txtOtherDescCreate").focus();
		otherResourceErrorFound = true;
	}
	*/
	
	
	//***Cost Information***
	var costErrorFound = false;
	var costInfoError = "";
	
	//Check if no value is entered for cost
	if(document.getElementById("txtAssociatedFeeCreate").value == ""){
		costInfoError = "Please enter an an Associated Fee"
		costErrorFound = true;
		document.getElementById("txtAssociatedFeeCreate").focus();
	}
	
	
	
	//***Gender Information***
	var genderErrorFound = false;
	var genderInfoError = "";
	
	if(document.getElementById("cbGenderAllCreate").checked == false & document.getElementById("cbMaleCreate").checked == false & document.getElementById("cbFemaleCreate").checked == false & document.getElementById("cbTransCreate").checked == false){
		genderInfoError = "Please select a Gender";
		genderErrorFound = true;
		document.getElementById("cbGenderAllCreate").focus();
	}
	
	
	
	//***Age Information***
	var ageErrorFound = false;
	var ageInfoError = "";
	
	if(document.getElementById("cbAgeAllCreate").checked == false & document.getElementById("cbInfantCreate").checked == false & document.getElementById("cbChildCreate").checked == false & document.getElementById("cbYouthCreate").checked == false & document.getElementById("cbAdultCreate").checked == false){
		ageInfoError = "Please select an Age Group";
		ageErrorFound = true;
		document.getElementById("cbAgeAllCreate").focus();
	}
	
	
	
	//***Nationality Information***
	var nationalityErrorFound = false;
	var nationalityInfoError = "";
	
	if(document.getElementById("cbNatAllCreate").checked == false & document.getElementById("cbDomesticCreate").checked == false & document.getElementById("cbForeignCreate").checked == false & document.getElementById("cbUndocumentedCreate").checked == false){
		nationalityInfoError = "Please select a Nationality"
		nationalityErrorFound = true;
		document.getElementById("cbNatAllCreate").focus();
	}
	
	
	
	//***Race Information***
	var raceErrorFound = false;
	var raceInfoError = "";
	
	if(document.getElementById("cbRaceAllCreate").checked == false & document.getElementById("cbBlackCreate").checked == false & document.getElementById("cbAsianCreate").checked == false & document.getElementById("cbWhiteCreate").checked == false & document.getElementById("cbHispanicLatinoCreate").checked == false & document.getElementById("cbNativeCreate").checked == false & document.getElementById("cbMultiRacialCreate").checked == false){
		raceInfoError = "Please select a Race";
		raceErrorFound = true;
		document.getElementById("cbRaceAllCreate").focus();
	}
	
	
	
	//***Ethnicity Information***
	var ethnicityErrorFound = false;
	var ethnicityInfoError = "";
	
	if(document.getElementById("cbEthnicityAllCreate").checked == false & document.getElementById("cbHispanicCreate").checked == false & document.getElementById("cbNonHispanicCreate").checked == false){
		ethnicityInfoError = "Please select an ethnicity";
		ethnicityErrorFound = true;
		document.getElementById("cbEthnicityAllCreate").focus();
	}
	
	//Populate all error messages if any have been found
	if(orgErrorFound || contactErrorFound || hourErrorFound || addHourErrorFound || resourceErrorFound || otherResourceErrorFound || costErrorFound || genderErrorFound || ageErrorFound || nationalityErrorFound || raceErrorFound || ethnicityErrorFound || addressErrorFound){
		document.getElementById("orgInfoErrorText").innerHTML = genInfoError;
		document.getElementById("contactErrorText").innerHTML = contactInfoError
		document.getElementById("addressErrorText").innerHTML = addressInfoError;
		document.getElementById("hoursErrorText").innerHTML = hoursInfoError;
		document.getElementById("addHoursErrorText").innerHTML = addHoursInfoError;
		document.getElementById("resourcesErrorText").innerHTML = resourcesInfoError;
		document.getElementById("otherResourcesErrorText").innerHTML = otherResourcesInfoError;
		document.getElementById("costErrorText").innerHTML = costInfoError;
		document.getElementById("genderErrorText").innerHTML = genderInfoError;
		document.getElementById("ageErrorText").innerHTML = ageInfoError;
		document.getElementById("nationalityErrorText").innerHTML = nationalityInfoError;
		document.getElementById("raceErrorText").innerHTML = raceInfoError;
		document.getElementById("ethnicityErrorText").innerHTML = ethnicityInfoError;
		document.getElementById("generalCreateErrorText").innerHTML = "<p>There are errors present in the form</p>";
		return false;
	}
	return true;
}

function updateFormValidation(){
		
	//***General Organization Information
	var orgErrorFound = false;
	var genInfoError = "";
	
	//Check for org name
	if(document.getElementById("txtOrgNameUpdate").value == ""){
		genInfoError = "Please enter an Organization name.";
		document.getElementById("txtOrgNameUpdate").focus();
		orgErrorFound = true;
	}
	console.log("general org passed");


	//***Contact Information***
	var contactErrorFound = false;
	var contactInfoError = "";
	
	//Check for a main phone number
	if(document.getElementById("txtMainPhoneUpdate").value == ""){
		contactInfoError = "Please enter a main phone number"
		document.getElementById("txtMainPhoneUpdate").focus();
		contactErrorFound = true;
	}
	
	//Checks for email, if blank must be N/A
	if(document.getElementById("txtOrgEmailUpdate").value == ""){
		if(contactErrorFound == false){
			contactInfoError += "Please enter N/A if there is no organization email"
		}
		else{
			contactInfoError += "<br>Please enter N/A if there is no organization email"
		}
		document.getElementById("txtOrgEmailUpdate").focus();
		contactErrorFound = true;
	}
	
	//Checks for @. in the org email
	if(!document.getElementById("txtOrgEmailUpdate").value.includes("@") & document.getElementById("txtOrgEmailUpdate").value != ""){
		if(contactErrorFound == false){
			contactInfoError = "Please enter a valid organization email"
		}
		else{
			contactInfoError += "<br>Please enter a valid organization email"
		}
		document.getElementById("txtOrgEmailUpdate").focus();
		contactErrorFound = true;
	}
	
	//Checks for @. in the contact email
	if(!document.getElementById("txtPrimaryContactEmailUpdate").value.includes("@") & document.getElementById("txtPrimaryContactEmailUpdate").value != "N/A"){
		if(contactErrorFound == false){
			contactInfoError = "Please enter a valid contact email"
		}
		else{
			contactInfoError += "<br>Please enter a valid contact email"
		}
		document.getElementById("txtPrimaryContactEmailUpdate").focus();
		contactErrorFound = true;
	}
	console.log("contact passed");
	
	
	//***Address Information***
	var addressErrorFound = false;
	var addressInfoError = "";
	
	//Check for one full address
	if(document.getElementById("txtAddress1StreetUpdate").value == "" || document.getElementById("txtAddress1CityUpdate").value == "" || document.getElementById("txtAddress1ZipUpdate").value == "" || document.getElementById("ddlAddress1StateUpdate").value == "-----" ){
		addressInfoError = "Please enter at least one full address";
		document.getElementById("txtAddress1StreetUpdate").focus();
		addressErrorFound = true;
	}
	//Check zip for all numbers
	if(isNaN(document.getElementById("txtAddress1ZipUpdate").value) || document.getElementById("txtAddress1ZipUpdate").value.length > 5 || document.getElementById("txtAddress1ZipUpdate").value.length < 5){
		if(addressErrorFound){
			addressInfoError += "<br>";
		}
		addressInfoError += "Please enter a valid Zip in Address 1"
		document.getElementById("txtAddress1ZipUpdate").focus();
		addressErrorFound = true;
		
	}
		if(isNaN(document.getElementById("txtAddress2ZipUpdate").value) || document.getElementById("txtAddress2ZipUpdate").value.length > 5){
			if(addressErrorFound){
				addressInfoError += "<br>";
			}
		addressInfoError += "Please enter a valid Zip in Address 2"
		document.getElementById("txtAddress2ZipUpdate").focus();
		addressErrorFound = true;
		}

		if(isNaN(document.getElementById("txtConfAddressZipUpdate").value)  ||  document.getElementById("txtConfAddressZipUpdate").value.length > 5){
			if(addressErrorFound){
			addressInfoError += "<br>";
			 }
		addressInfoError += "Please enter a valid Zip in confidential Address"
		document.getElementById("txtConfAddressZipUpdate").focus();
		addressErrorFound = true;
		}
	console.log("address passed");
	
	
	//***Hours Information***
	var hourErrorFound = false;
	var hoursInfoError = "";
	
	//Checks to make sure something is selected in hours
	if(document.getElementById("ddlGenFullWeekStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenFullWeekSatStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekSatEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenFullWeekSunStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekSunEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenMondayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenMondayEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenTuesdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenTuesdayEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenWednesdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenWednesdayEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenThursdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenThursdayEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenFridayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFridayEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenSaturdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenSaturdayEndTimeUpdate").value == "-----"
		& document.getElementById("ddlGenSundayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenSundayEndTimeUpdate").value == "-----"
		& document.getElementById("cbIs247Update").checked == false){
		
		hoursInfoError = "Please select at least one time";
		hoursErrorFound = true;
		document.getElementById("ddlGenFullWeekStartTimeUpdate").focus();
	}
	
	//If there is a start time, there needs to be an end time, and vice versa
	if(document.getElementById("ddlGenFullWeekStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekEndTimeUpdate").value != "-----"){
		hoursInfoError = "Please enter a start time for Monday - Friday";
		document.getElementById("ddlGenFullWeekStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFullWeekEndTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Monday - Friday";
		document.getElementById("ddlGenFullWeekEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenFullWeekSatStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekSatEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlGenFullWeekSatStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFullWeekSatEndTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekSatStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlGenFullWeekSatEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenFullWeekSunStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekSunEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlGenFullWeekSunStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFullWeekSunEndTimeUpdate").value == "-----" & document.getElementById("ddlGenFullWeekSunStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlGenFullWeekSunEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenMondayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenMondayEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Monday";
		document.getElementById("ddlGenMondayStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenMondayEndTimeUpdate").value == "-----" & document.getElementById("ddlGenMondayStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Monday";
		document.getElementById("ddlGenMondayEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenTuesdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenTuesdayEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Tuesday";
		document.getElementById("ddlGenTuesdayStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenTuesdayEndTimeUpdate").value == "-----" & document.getElementById("ddlGenTuesdayStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Tuesday";
		document.getElementById("ddlGenTuesdayEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenWednesdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenWednesdayEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Wednesday";
		document.getElementById("ddlGenWednesdayStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenWednesdayEndTimeUpdate").value == "-----" & document.getElementById("ddlGenWednesdayStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Wednesday";
		document.getElementById("ddlGenWednesdayEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenThursdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenThursdayEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Thursday";
		document.getElementById("ddlGenThursdayStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenThursdayEndTimeUpdate").value == "-----" & document.getElementById("ddlGenThursdayStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Thursday";
		document.getElementById("ddlGenThursdayEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenFridayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenFridayEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Friday";
		document.getElementById("ddlGenFridayStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenFridayEndTimeUpdate").value == "-----" & document.getElementById("ddlGenFridayStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Friday";
		document.getElementById("ddlGenFridayEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenSaturdayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenSaturdayEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlGenSaturdayStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenSaturdayEndTimeUpdate").value == "-----" & document.getElementById("ddlGenSaturdayStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlGenSaturdayEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	
	if(document.getElementById("ddlGenSundayStartTimeUpdate").value == "-----" & document.getElementById("ddlGenSundayEndTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlGenSundayStartTimeUpdate").focus();
		hourErrorFound = true;
	}
	if(document.getElementById("ddlGenSundayEndTimeUpdate").value == "-----" & document.getElementById("ddlGenSundayStartTimeUpdate").value != "-----"){
		if(hourErrorFound){
			hoursInfoError += "<br>";
		}
		hoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlGenSundayEndTimeUpdate").focus();
		hourErrorFound = true;
	}
	console.log("hours passed");
	
	
	//***Additional Hours Information***
	var addHourErrorFound = false;
	var addHoursInfoError = "";
	
	//If there is a start time, there needs to be an end time, and vice versa
	if(document.getElementById("ddlAddFullWeekStartTimeUpdate").value == "-----" & document.getElementById("ddlAddFullWeekEndTimeUpdate").value != "-----"){
		addHoursInfoError = "Please enter a start time for Monday - Friday";
		document.getElementById("ddlAddFullWeekStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFullWeekEndTimeUpdate").value == "-----" & document.getElementById("ddlAddFullWeekStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Monday - Friday";
		document.getElementById("ddlAddFullWeekEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddFullWeekSatStartTimeUpdate").value == "-----" & document.getElementById("ddlAddFullWeekSatEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlAddFullWeekSatStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFullWeekSatEndTimeUpdate").value == "-----" & document.getElementById("ddlAddFullWeekSatStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlAddFullWeekSatEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddFullWeekSunStartTimeUpdate").value == "-----" & document.getElementById("ddlAddFullWeekSunEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlAddFullWeekSunStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFullWeekSunEndTimeUpdate").value == "-----" & document.getElementById("ddlAddFullWeekSunStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlAddFullWeekSunEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddMondayStartTimeUpdate").value == "-----" & document.getElementById("ddlAddMondayEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Monday";
		document.getElementById("ddlAddMondayStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddMondayEndTimeUpdate").value == "-----" & document.getElementById("ddlAddMondayStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Monday";
		document.getElementById("ddlAddMondayEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddTuesdayStartTimeUpdate").value == "-----" & document.getElementById("ddlAddTuesdayEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Tuesday";
		document.getElementById("ddlAddTuesdayStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddTuesdayEndTimeUpdate").value == "-----" & document.getElementById("ddlAddTuesdayStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Tuesday";
		document.getElementById("ddlAddTuesdayEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddWednesdayStartTimeUpdate").value == "-----" & document.getElementById("ddlAddWednesdayEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Wednesday";
		document.getElementById("ddlAddWednesdayStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddWednesdayEndTimeUpdate").value == "-----" & document.getElementById("ddlAddWednesdayStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Wednesday";
		document.getElementById("ddlAddWednesdayEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddThursdayStartTimeUpdate").value == "-----" & document.getElementById("ddlAddThursdayEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Thursday";
		document.getElementById("ddlAddThursdayStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddThursdayEndTimeUpdate").value == "-----" & document.getElementById("ddlAddThursdayStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Thursday";
		document.getElementById("ddlAddThursdayEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddFridayStartTimeUpdate").value == "-----" & document.getElementById("ddlAddFridayEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Friday";
		document.getElementById("ddlAddFridayStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddFridayEndTimeUpdate").value == "-----" & document.getElementById("ddlAddFridayStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Friday";
		document.getElementById("ddlAddFridayEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddSaturdayStartTimeUpdate").value == "-----" & document.getElementById("ddlAddSaturdayEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Saturday";
		document.getElementById("ddlAddSaturdayStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddSaturdayEndTimeUpdate").value == "-----" & document.getElementById("ddlAddSaturdayStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Saturday";
		document.getElementById("ddlAddSaturdayEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	
	if(document.getElementById("ddlAddSundayStartTimeUpdate").value == "-----" & document.getElementById("ddlAddSundayEndTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError = "Please enter a start time for Sunday";
		document.getElementById("ddlAddSundayStartTimeUpdate").focus();
		addHourErrorFound = true;
	}
	if(document.getElementById("ddlAddSundayEndTimeUpdate").value == "-----" & document.getElementById("ddlAddSundayStartTimeUpdate").value != "-----"){
		if(addHourErrorFound){
			addHoursInfoError += "<br>";
		}
		addHoursInfoError += "Please enter an end time for Sunday";
		document.getElementById("ddlAddSundayEndTimeUpdate").focus();
		addHourErrorFound = true;
	}
	console.log("add hours passed");
	
	
	//***Resources Information***
	var resourceErrorFound = false;
	var resourcesInfoError = "";
	
	
	
	//***Other Resources Information***
	var otherResourceErrorFound = false;
	var otherResourcesInfoError = "";
	
	/*
	//If other is selected, it needs a description
	if(document.getElementById("cbOtherAllUpdate").checked == true || document.getElementById("cbOtherServUpdate").checked == true || document.getElementById("cbOtherSupplyUpdate").checked == true || document.getElementById("cbOtherEmergRespUpdate").checked == true & document.getElementById("txtOtherDescUpdate").value == ""){
		otherResourcesInfoError = "Please enter a description for other";
		document.getElementById("txtOtherDescUpdate").focus();
		otherResourceErrorFound = true;
	}
	console.log("other resource passed");
	*/
	
	//***Cost Information***
	var costErrorFound = false;
	var costInfoError = "";
	
	//Check if no value is entered for cost
	if(document.getElementById("txtAssociatedFeeUpdate").value == ""){
		costInfoError = "Please enter an an Associated Fee"
		costErrorFound = true;
		document.getElementById("txtAssociatedFeeUpdate").focus();
	}
	console.log("cost passed");
	
	
	//***Gender Information***
	var genderErrorFound = false;
	var genderInfoError = "";
	
	if(document.getElementById("cbGenderAllUpdate").checked == false & document.getElementById("cbMaleUpdate").checked == false & document.getElementById("cbFemaleUpdate").checked == false & document.getElementById("cbTransUpdate").checked == false){
		genderInfoError = "Please select a Gender";
		genderErrorFound = true;
		document.getElementById("cbGenderAllUpdate").focus();
	}
	console.log("gender passed");
	
	
	//***Age Information***
	var ageErrorFound = false;
	var ageInfoError = "";
	
	if(document.getElementById("cbAgeAllUpdate").checked == false & document.getElementById("cbInfantUpdate").checked == false & document.getElementById("cbChildUpdate").checked == false & document.getElementById("cbYouthUpdate").checked == false & document.getElementById("cbAdultUpdate").checked == false){
		ageInfoError = "Please select an Age Group";
		ageErrorFound = true;
		document.getElementById("cbAgeAllUpdate").focus();
	}
	console.log("age passed");
	
	
	//***Nationality Information***
	var nationalityErrorFound = false;
	var nationalityInfoError = "";
	
	if(document.getElementById("cbNatAllUpdate").checked == false & document.getElementById("cbDomesticUpdate").checked == false & document.getElementById("cbForeignUpdate").checked == false & document.getElementById("cbUndocumentedUpdate").checked == false){
		nationalityInfoError = "Please select a Nationality"
		nationalityErrorFound = true;
		document.getElementById("cbNatAllUpdate").focus();
	}
	console.log("nat passed");
	
	
	//***Race Information***
	var raceErrorFound = false;
	var raceInfoError = "";
	
	if(document.getElementById("cbRaceAllUpdate").checked == false & document.getElementById("cbBlackUpdate").checked == false & document.getElementById("cbAsianUpdate").checked == false & document.getElementById("cbWhiteUpdate").checked == false & document.getElementById("cbHispanicLatinoUpdate").checked == false & document.getElementById("cbNativeUpdate").checked == false & document.getElementById("cbMultiRacialUpdate").checked == false){
		raceInfoError = "Please select a Race";
		raceErrorFound = true;
		document.getElementById("cbRaceAllUpdate").focus();
	}
	console.log("race passed");
	
	
	//***Ethnicity Information***
	var ethnicityErrorFound = false;
	var ethnicityInfoError = "";
	
	if(document.getElementById("cbEthnicityAllUpdate").checked == false & document.getElementById("cbHispanicUpdate").checked == false & document.getElementById("cbNonHispanicUpdate").checked == false){
		ethnicityInfoError = "Please select an ethnicity";
		ethnicityErrorFound = true;
		document.getElementById("cbEthnicityAll").focus();
	}
	console.log("eth passed");
	
	
	
	//Populate all error messages if any have been found
	if(orgErrorFound || contactErrorFound || hourErrorFound || addHourErrorFound || resourceErrorFound || otherResourceErrorFound || costErrorFound || genderErrorFound || ageErrorFound || nationalityErrorFound || raceErrorFound || ethnicityErrorFound || addressErrorFound){
		document.getElementById("orgInfoErrorTextUpdate").innerHTML = genInfoError;
		document.getElementById("contactErrorTextUpdate").innerHTML = contactInfoError
		document.getElementById("addressErrorTextUpdate").innerHTML = addressInfoError;
		document.getElementById("hoursErrorTextUpdate").innerHTML = hoursInfoError;
		document.getElementById("addHoursErrorTextUpdate").innerHTML = addHoursInfoError;
		document.getElementById("resourcesErrorTextUpdate").innerHTML = resourcesInfoError;
		document.getElementById("otherResourcesErrorTextUpdate").innerHTML = otherResourcesInfoError;
		document.getElementById("costErrorTextUpdate").innerHTML = costInfoError;
		document.getElementById("genderErrorTextUpdate").innerHTML = genderInfoError;
		document.getElementById("ageErrorTextUpdate").innerHTML = ageInfoError;
		document.getElementById("nationalityErrorTextUpdate").innerHTML = nationalityInfoError;
		document.getElementById("raceErrorTextUpdate").innerHTML = raceInfoError;
		document.getElementById("ethnicityErrorTextUpdate").innerHTML = ethnicityInfoError;
		document.getElementById("generalUpdateErrorText").innerHTML = "<p>There are errors present in the form</p>";
		return false;
	}
	return true;
}

function btnOrganizationInfoOnClick(modal) {
	
	if (modal == "update") {
		$('#updateModalTabs a[href="#orgInfoUpdate"]').tab('show');
		document.getElementById("txtOrgNameUpdate").focus();
	}
	else {
		$('#CreateModalTabs a[href="#orgInfoCreate"]').tab('show');
		document.getElementById("txtOrgNameCreate").focus();
	}
}

function btnResourcesOfferedOnClick(modal) {
	
   if (modal == "update") {
    	$('#updateModalTabs a[href="#orgResourcesUpdate"]').tab('show');
		document.getElementById("cbHousingAllUpdate").focus();
    }
    else {
    	$('#CreateModalTabs a[href="#orgResourcesCreate"]').tab('show');
		document.getElementById("cbHousingAllCreate").focus();
    }
    
}

function btnAdditionalConsiderationsOnClick(modal){
	
	if (modal == "update") {
    	$('#updateModalTabs a[href="#orgAddConsiderationsUpdate"]').tab('show');
		document.getElementById("txtAssociatedFeeUpdate").focus();
    }
    else {
    	$('#CreateModalTabs a[href="#orgAddConsiderationsCreate"]').tab('show');
		document.getElementById("txtAssociatedFeeCreate").focus();
    }
	
}

function btnDemographicsServedOnClick(modal) {
	
	if (modal == "update") {
    	$('#updateModalTabs a[href="#orgDemographicsServedUpdate"]').tab('show');
		document.getElementById("cbGenderAllUpdate").focus();
    }
    else {
    	$('#CreateModalTabs a[href="#orgDemographicsServedCreate"]').tab('show');
		document.getElementById("cbGenderAllCreate").focus();
    }
	
}

function btnNotesOnClick(modal) {
	
	if (modal == "update") {
    	$('#updateModalTabs a[href="#orgNotesUpdate"]').tab('show');
		document.getElementById("txtNoteUpdate").focus();
	}
    else {
    	$('#CreateModalTabs a[href="#orgNotesCreate"]').tab('show');
		document.getElementById("txtNoteCreate").focus();
    }
	
}

function showCreateMessage(message) {
	document.getElementById("formControlBodyCreate").style.display = 'none';
	document.getElementById("createMessageBodyCreate").style.display = 'block';
	document.getElementById("createBtn").disabled = true;
	document.getElementById("cbIsApprovedCreate").disabled = true;
	if(message.replace(/\n/ig, '') == "approved") {
		document.getElementById("createMessageBodyCreate").innerHTML = "<p>Your organization has been submitted and approved successfully.</p><button type=\"button\" class=\"btn btn-default btn-md\" id=\"resetCreate\" onclick=\"resetCreateModal()\"updateCreate\" >Insert Another</button>";
	}
	if(message.replace(/\n/ig, '') == "not approved") {
		 document.getElementById("createMessageBodyCreate").innerHTML = "<p>Thank you for submitting your application to become part of our Resource Hub! Your organization will be notified once you have been approved. If you have any questions about the application process, please contact a YWCA associate advocate.</p><button type=\"button\" class=\"btn btn-default btn-md\" id=\"resetCreate\" onclick=\"resetCreateModal()\">Insert Another</button>";
	}
}

function showUpdateMessage(message) {
	document.getElementById("formControlBodyUpdate").style.display = 'none';
	document.getElementById("updateMessageBodyUpdate").style.display = 'block';
	document.getElementById("updBtn").disabled = true;
	document.getElementById("cbIsApprovedUpdate").disabled = true;
	if(message.replace(/\n/ig, '') == "success") {
	document.getElementById("updateMessageBodyUpdate").innerHTML = "<p>Your info has been successfully updated! If you aren't seeing your changes right away, try refreshing your browser.</p>";
	}
	else {
	document.getElementById("updateMessageBodyUpdate").innerHTML = "<p>Oops! Something went wrong. Please try again later</p>";
	}
}

function hideCreateMessage() {
	document.getElementById("formControlBodyCreate").style.display = 'block';
	document.getElementById("createMessageBodyCreate").style.display = 'none';
	document.getElementById("createMessageBodyCreate").innerHTML = "";
	document.getElementById("createBtn").disabled = false;
	document.getElementById("cbIsApprovedCreate").disabled = false;
}

function hideUpdateMessage() {
	document.getElementById("formControlBodyUpdate").style.display = 'block';
	document.getElementById("updateMessageBodyUpdate").style.display = 'none';
	document.getElementById("updateMessageBodyUpdate").innerHTML = "";
	document.getElementById("updBtn").disabled = false;
	document.getElementById("cbIsApprovedUpdate").disabled = false;
	
}




        
        
        
        
        
        