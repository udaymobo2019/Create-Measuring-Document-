var GlobalModel;
sap.ui.define(["sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
		"sap/ui/core/Fragment",
		"./utilities",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/odata/ODataModel",
		'sap/m/MessageToast'

	], function (BaseController, MessageBox, Fragment, Utilities, Filter, FilterOperator, History, JSONModel, ODataModel, MessageToast) {
		"use strict";

		return BaseController.extend("com.sap.build.ba293bd41-us_1.createMeasuringPointGrunt.controller.Page1", {
			onInit: function () {
				this.ci_att1 = [];/*sa*/
				this.baseval = [];
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var oInput = this.byId("reading");
				oInput.attachBrowserEvent("mousewheel", function (oEvent) {
					oEvent.preventDefault();
				});
				var input = this.byId("difference");
				input.attachBrowserEvent("mousewheel", function (oEvent) {
					oEvent.preventDefault();
				});

				var input2 = this.byId("Mesreading");
				input2.attachBrowserEvent("mousewheel", function (oEvent) {
					oEvent.preventDefault();
				});

				this.measuringpoint = sap.ui.xmlfragment("measuring_point",
					"com.sap.build.ba293bd41-us_1.createMeasuringPointGrunt.fragments.Measuring_point", this);
				this.getView().addDependent(this.measuringpoint);

				this.Open_var = sap.ui.xmlfragment("open", "com.sap.build.ba293bd41-us_1.createMeasuringPointGrunt.fragments.open", this);
				this.getView().addDependent(this.Open_var);

				this.Save_var = sap.ui.xmlfragment("save", "com.sap.build.ba293bd41-us_1.createMeasuringPointGrunt.fragments.save", this);
				this.getView().addDependent(this.Save_var);

				/*				this.documentList = sap.ui.xmlfragment("Measuring_doc_list",
									"com.sap.build.ba293bd41-us_1.createMeasuringPointGrunt.fragments.Measuring_Document_List", this);
								this.getView().addDependent(this.documentList);*/

				//CreateModel Created in Component.js for global declaration
				this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this._onObjectMatched, this));
				//	this.userId = window.sap.ushell.Container.getUser().getId();

				var designation = window.location.origin;
				if (designation === "https://flpnwc-ba293bd41.dispatcher.us1.hana.ondemand.com") {
					this.getView().byId("Dashboard").setVisible(true);
				} else {
					this.getView().byId("Dashboard").setVisible(false);
				}

			},

			Save_press: function () {

				this.Save_var.open();
				this.user = parent.sap.ushell.Container.getUser().getId();
				sap.ui.core.Fragment.byId("save", "crea_by_txt").setText(this.user);
			},

			test: function () {

				var Mes_inp = this.getView().byId("mespoint").getValue();
				var Split_Mes_inp = Mes_inp.split(" ");
				var Split_Mes_inp_las = Split_Mes_inp[0];

				var sMeasure = "/MesPointGetDetailSet('" + Split_Mes_inp_las + "')";
				this._oDataMeasureDocument.read(sMeasure, {
					success: function (oData, oResponse) {
						console.log("oData", oData);
						this.counter = oData.Counter;
						console.log("this.counter", this.counter);
					}
				});

			},

			savevarok: function () {

				var variantName = sap.ui.core.Fragment.byId("save", "varname").getValue();

				if (variantName === "" || variantName === "undefined") {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.error("Please enter variant name", {
						title: "Error",
						onClose: null
					});
				} else {
					var counter = "";
					var Mes_inp = this.getView().byId("mespoint").getValue();
					var Split_Mes_inp = Mes_inp.split(" ");
					var Split_Mes_inp_las = Split_Mes_inp[0];

					var sMeasure = "/MesPointGetDetailSet('" + Split_Mes_inp_las + "')";
					this._oDataMeasureDocument.read(sMeasure, {
						success: function (oData, oResponse) {
							console.log("oData", oData);
							counter = oData.Counter;
							console.log("counter", counter);
						}
					});

					var that = this;
					sap.m.MessageBox.show(
						"Do you want to save the variant?", {
							icon: sap.m.MessageBox.Icon.INFORMATION,
							title: "Information Message",
							actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
							onClose: function (oAction) {

								if (oAction === "YES") {

									var varia_desc = sap.ui.core.Fragment.byId("save", "var_des").getValue();
									var Mes_inpsss = that.getView().byId("mespoint").getValue();
									var Char_inp = that.getView().byId("Characteristics_inp").getValue();
									var Char_Uni_inp = that.getView().byId("Characteristics_Unit_inp").getValue();
									var Func_Loc_inp = that.getView().byId("Functional_Location_inp").getValue();
									var Equp_inp = that.getView().byId("Equip_inp").getValue();
									var description_txt = that.getView().byId("description").getValue();

									var reading_inp = that.getView().byId("reading").getValue();
									var difference_inp = that.getView().byId("difference").getValue();
									var Last_inp = that.getView().byId("Last").getValue();
									var Annual_inp = that.getView().byId("Annual").getValue();
									var Counter_inp = that.getView().byId("Counter").getValue();
									var valuationgrp_inp = that.getView().byId("valuationgrp").getValue();
									var valcode_inp = that.getView().byId("valcode").getValue();

									var Mesreading_inp = that.getView().byId("Mesreading").getValue();
									var targetvalue_inp = that.getView().byId("targetvalue").getValue();
									var pointercode_inp = that.getView().byId("pointercode").getValue();
									var pointercodegrp_inp = that.getView().byId("pointercodegrp").getValue();
									var oModelVariant = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPM_WORKORDER_SRV_01/", true);
									var postdata = {
										"VariantDate": "",
										"VariantTime": "",
										"ModuleName": "PM",
										"ApplicationName": "MEASURING DOCUMENT",
										"VariantName": variantName,
										"VariantDescription": varia_desc,
										"CreatedBy": that.userId,

										"Header2ItemNavi": [{
											"FieldName": "COUNTPOINT",
											"FieldValue": counter
										}, {
											"FieldName": "Measuring Point",
											"FieldValue": Mes_inpsss
										}, {
											"FieldName": "Characteristics",
											"FieldValue": Char_inp
										}, {
											"FieldName": "Characteristics Unit",
											"FieldValue": Char_Uni_inp
										}, {
											"FieldName": "Functional Location",
											"FieldValue": Func_Loc_inp
										}, {
											"FieldName": "Equipment",
											"FieldValue": Equp_inp
										}, {
											"FieldName": "Description",
											"FieldValue": description_txt
										}, {
											"FieldName": "Counter Reading",
											"FieldValue": reading_inp
										}, {
											"FieldName": "Difference",
											"FieldValue": difference_inp
										}, {
											"FieldName": "Last Counter Read",
											"FieldValue": Last_inp
										}, {
											"FieldName": "Counter Over Read",
											"FieldValue": Annual_inp
										}, {
											"FieldName": "Total Counter Read",
											"FieldValue": Counter_inp
										}, {
											"FieldName": "Valu Code Group",
											"FieldValue": valuationgrp_inp
										}, {
											"FieldName": "Valuation Code",
											"FieldValue": valcode_inp
										}, {
											"FieldName": "Mes Read Pointer",
											"FieldValue": Mesreading_inp
										}, {
											"FieldName": "Target val Pointer",
											"FieldValue": targetvalue_inp
										}, {
											"FieldName": "Pointer Code",
											"FieldValue": pointercode_inp
										}, {
											"FieldName": "Pointer Code Grp",
											"FieldValue": pointercodegrp_inp
										}]
									};
									var sPath = "/HeaderSet";
									oModelVariant.create(sPath, postdata, {
										success: function (oData, oResponse) {
											console.log("oData", oData);
											var VariantDate = oData.VariantDate;
											var VariantTime = oData.VariantTime;
											var VariantName = oData.VariantName;
											MessageToast.show("The Variant " + VariantName + " Saved!");
										}
									});
								}
							}
						});
					this.Save_var.close();
				}

			},

			savevarcancel: function () {

				this.Save_var.close();

			},

			Open_press: function () {

				this.Open_var.open();
				this.comboBoxBinding();
			},

			openvarok: function () {
				var varian = sap.ui.core.Fragment.byId("open", "selectvarname").getSelectedKey();
				/*			var Func_Loc_vis = this.getView().byId("Functional_Location_inp").getVisible();
							var Equip_vis = this.getView().byId("Equip_inp").getVisible();*/
				if (varian === "" || varian === "undefined") {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.error("Select variant name", {
						title: "Error",
						onClose: null
					});
				} else {
					//	this.getView().getModel("oviewModel").setProperty("/createbutton", true);
					var oFilter = [new sap.ui.model.Filter("ModuleName", sap.ui.model.FilterOperator.EQ, 'PM'), new sap.ui.model.Filter(
							"ApplicationName", sap.ui.model.FilterOperator.EQ, 'MEASURING DOCUMENT'),
						new sap.ui.model.Filter("VariantName", sap.ui.model.FilterOperator.EQ, varian)
					];
					var sPath = "/HeaderSet";
					// console.log("sPath", sPath);
					var that = this;
					var oModel = new sap.ui.model.odata.ODataModel('/sap/opu/odata/sap/ZPM_WORKORDER_SRV_01/', true);
					oModel.read(sPath, {

						urlParameters: {
							"$expand": "Header2ItemNavi" //Multiple expand odata
						},
						filters: oFilter,
						success: function (oData, oResponse) {
							console.log("open var", oData);
							that.count_point_fldname = oData.results[0].Header2ItemNavi.results[0].FieldName;
							that.count_point = oData.results[0].Header2ItemNavi.results[0].FieldValue;
							var count = oData.results[0].Header2ItemNavi.results.length;

							if (that.count_point_fldname === "COUNTPOINT" && that.count_point === "X") {
								for (var i = 0; i < count; i++) {
									var FieldName = oData.results[0].Header2ItemNavi.results[i].FieldName;
									var FieldValue = oData.results[0].Header2ItemNavi.results[i].FieldValue;
									if (FieldName === "Measuring Point") {
										that.getView().byId("mespoint").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Characteristics") {
										that.getView().byId("Characteristics_inp").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Characteristics Unit") {
										that.getView().byId("Characteristics_Unit_inp").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Functional Location" && FieldValue !== "") {
										that.getView().getModel("oviewModel").setProperty("/functionllocation", true);
										that.getView().getModel("oviewModel").setProperty("/equipment", false);
										that.getView().byId("Functional_Location_inp").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Equipment" && FieldValue !== "") {
										that.getView().getModel("oviewModel").setProperty("/equipment", true);
										that.getView().getModel("oviewModel").setProperty("/functionllocation", false);
										that.getView().byId("Equip_inp").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Description") {
										that.getView().byId("description").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
										that.getView().getModel("oviewModel").setProperty("/description", true);
									} else if (FieldName === "Counter Reading") {
										that.getView().byId("reading").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Difference") {
										that.getView().byId("difference").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Last Counter Read") {
										that.getView().byId("Last").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Counter Over Read") {
										that.getView().byId("Annual").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
										that.getView().getModel("oviewModel").setProperty("/Annual", true);
									} else if (FieldName === "Total Counter Read") {
										that.getView().byId("Counter").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Valu Code Group") {
										that.getView().byId("valuationgrp").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									} else if (FieldName === "Valuation Code") {
										that.getView().byId("valcode").setValue(oData.results[0].Header2ItemNavi.results[i].FieldValue);
									}
								}
								that.getView().byId("counter").setVisible(true);
								that.getView().byId("pointer").setVisible(false);
								that.getView().byId("Mesreading").setValue();
								that.getView().byId("targetvalue").setValue();
								that.getView().byId("pointercode").setValue();
								that.getView().byId("pointercodegrp").setValue();
							} else {

								for (var j = 0; j < count; j++) {
									var FieldNames = oData.results[0].Header2ItemNavi.results[j].FieldName;
									var FieldValues = oData.results[0].Header2ItemNavi.results[j].FieldValue;
									if (FieldNames === "Measuring Point") {
										that.getView().byId("mespoint").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									} else if (FieldNames === "Characteristics") {
										that.getView().byId("Characteristics_inp").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									} else if (FieldNames === "Characteristics Unit") {
										that.getView().byId("Characteristics_Unit_inp").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									} else if (FieldNames === "Functional Location" && FieldValues !== "") {
										that.getView().getModel("oviewModel").setProperty("/functionllocation", true);
										that.getView().getModel("oviewModel").setProperty("/equipment", false);
										that.getView().byId("Functional_Location_inp").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									} else if (FieldNames === "Equipment" && FieldValues !== "") {
										that.getView().getModel("oviewModel").setProperty("/equipment", true);
										that.getView().getModel("oviewModel").setProperty("/functionllocation", false);
										that.getView().byId("Equip_inp").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									} else if (FieldNames === "Description") {
										that.getView().byId("description").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
										that.getView().getModel("oviewModel").setProperty("/description", true);
									} else if (FieldNames === "Mes Read Pointer") {
										that.getView().byId("Mesreading").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
										that.getView().getModel("oviewModel").setProperty("/mesreading", true);
									} else if (FieldNames === "Target val Pointer") {
										that.getView().byId("targetvalue").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									} else if (FieldNames === "Pointer Code") {
										that.getView().byId("pointercode").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									} else if (FieldNames === "Pointer Code Grp") {
										that.getView().byId("pointercodegrp").setValue(oData.results[0].Header2ItemNavi.results[j].FieldValue);
									}
								}
								that.getView().byId("counter").setVisible(false);
								that.getView().byId("pointer").setVisible(true);
								that.getView().byId("reading").setValue();
								that.getView().byId("difference").setValue();
								that.getView().byId("Last").setValue();
								that.getView().byId("Annual").setValue();
								that.getView().byId("Counter").setValue();
								that.getView().byId("valuationgrp").setValue();
								that.getView().byId("valcode").setValue();
							}
						}
					});
					sap.ui.core.Fragment.byId("open", "selectvarname").setValue();
					this.Open_var.close();
					this.getView().byId("savevar").setEnabled(true);
					this.getView().byId("createmesdoc").setEnabled(true);
				}
			},

			openvarcancel: function () {

				this.Open_var.close();

			},

			Sel_var_chng: function () {

			},

			/*			onAfterRendering: function () {
							alert("onAfterRendering");
							var element = document.getElementById("__layout3-spacer");
							element.parentNode.removeChild(element);
						},*/
			_onObjectMatched: function () {
				this._oDataModelHelpServ = this.getOwnerComponent().getModel();
				this._oDataMeasureDocument = this.getView().getModel("oDataMeasureDocument");
				this.oDataF4 = this.getView().getModel("OdataF4");
				GlobalModel = this.getView().getModel("dataModelGlobal");
				this.comboBoxBinding();
				this.createViewDataModel();
				this._listBinding();
				//	this.userId = parent.sap.ushell.Container.getUser().getId();
			},

			_listBinding: function () {
				var that = this;
				that.arr1 = [];
				that.arr2 = [];
				var sPath = "/MeasuringDocumentListSet";
				this._oDataMeasureDocument.read(sPath, {
					success: function (oData, oResponse) {
						that.getView().getModel("oGlobalModel").setProperty("/Documentpulllist", oData.results);
					}

				});

			},

			//model for the view
			createViewDataModel: function () {
				this.viewModel = new JSONModel({
					counterView: true,
					pointerView: true,
					noDatafunc: "No Data",
					noDataequip: "No Data for this Equipment",
					noDatamespoint: "No Data for this Measuring Point",
					equiptable: false,
					functable: false,
					mespoint: false,
					overMeasReading: "Enter Value Greater that Target Reading",
					diffeditable: true,
					busy: false,
					equipment: false,
					functionllocation: false,
					counterdata: false,
					pointerdata: true,
					generaldata: true,
					documenthistory: false,
					attachment: true,
					valuationcode: false,
					pointercodegrp: false,
					createbutton: false,
					Annual: false,
					sublable: false,
					subcombo: false,
					targetvalue: false,
					mesreading: false,
					description: false,
					funcequip: true,
					upload: false,
					okbutton: true

				});
				this.getView().setModel(this.viewModel, "oviewModel");
			},

			//combobox binding view
			comboBoxBinding: function () {
				/*Equipment F4 Binding*/
				var sPath = "/EquipmentF4Set";
				var that = this;
				that._oDataModelHelpServ.read(sPath, {
					success: function (oData, oResponse) {
						that.getView().getModel("dataModelGlobal").setSizeLimit(2595);
						that.getView().getModel("dataModelGlobal").setProperty("/Equipmentf4", oData.results);

					}
				});
				/*Functional Location F4 Binding*/
				var sPath = "/FunctionalLocAllDataSet";
				that._oDataModelHelpServ.read(sPath, {
					success: function (oData, oResponse) {
						that.getView().getModel("dataModelGlobal").setSizeLimit(1500);
						that.getView().getModel("dataModelGlobal").setProperty("/FunctionalLocAllDataSet", oData.results);

					}
				});

				/*Measuring Point F4 Binding*/
				var sPath1 = "/MeasuringPointMasterSet";
				that.oDataF4.read(sPath1, {
					success: function (oData, oResponse) {
						that.getView().getModel("dataModelGlobal").setSizeLimit(4000);
						that.getView().getModel("dataModelGlobal").setProperty("/MeasuringPointSet", oData.results);
					}
				});

				var oModel = new ODataModel("/sap/opu/odata/sap/ZPM_WORKORDER_SRV_01/", true);
				var sPaths = "/VariantF4Set?$filter=ModuleName eq'PM' and ApplicationName eq'MEASURING DOCUMENT'";
				oModel.read(sPaths, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						that.getView().getModel("dataModelGlobal").setSizeLimit(count);
						that.getView().getModel("dataModelGlobal").setProperty("/VariantF4", oData.results);
					}
				});
			},

			custFrag_Close: function () {

				this.documentList.close();

			},

			Functionalpull: function () {
				this.func = sap.ui.core.Fragment.byId("measuring_point", "funloc").getSelectedKey();
				var filter = [];
				filter.push(new sap.ui.model.Filter("FunctionalLocation", sap.ui.model.FilterOperator.EQ,
					this.func));
				this.oDataF4.read("/MeasuringPointMasterSet", {
					filters: filter,
					success: function (oData, oResponse) {
						console.log("Functionalpull Odata", oData);
						var function_array = [];
						function_array = oData;
						var length = function_array.results.length;
						if (length == "0") {
							//	this.getView().getModel("oviewModel").setProperty("/noDatafunc");
							this.getView().getModel("oviewModel").setProperty("/functable", true);
							this.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", oData.results);
							this.Sub_functionlTable();
						} else {
							this.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", oData.results);
							this.getView().getModel("oviewModel").setProperty("/functable", true);
							this.getView().getModel("oviewModel").setProperty("/okbutton", true);
							this.Sub_functionlTable();
						}
					}.bind(this)
				});

			},
			Sub_functionlTable: function () {
				var that = this;
				var filter = [];
				filter.push(new sap.ui.model.Filter("FunctionalLocation", sap.ui.model.FilterOperator.EQ,
					that.func));
				var oModel = new ODataModel('/sap/opu/odata/sap/ZpM_F4_SRV/', true);
				oModel.read("/SubFunctionalLocationSet", {
					filters: filter,
					success: function (oData, oResponse) {
						var length = oData.results.length;
						if (length == "0") {
							that.getView().getModel("oviewModel").setProperty("/subcombo", false);
							that.getView().getModel("oviewModel").setProperty("/sublable", false);
						} else {
							that.getView().getModel("oviewModel").setProperty("/subcombo", true);
							that.getView().getModel("oviewModel").setProperty("/sublable", true);
							that.getView().getModel("oviewModel").setProperty("/okbutton", true);
						}
						that.getView().getModel("dataModelGlobal").setProperty("/subpull", oData.results);
					}
				});
			},
			sublocation_change: function () {
				var that = this;
				var functionallocation = sap.ui.core.Fragment.byId("measuring_point", "subfunctech").getSelectedKey();
				var filter = [];
				filter.push(new sap.ui.model.Filter("FunctionalLocation", sap.ui.model.FilterOperator.EQ,
					functionallocation));
				this.oDataF4.read("/MeasuringPointMasterSet", {
					filters: filter,
					success: function (oData, oResponse) {
						console.log("sublocation_change Odata", oData);
						var length = oData.results.length;
						if (length == "0") {
							that.getView().getModel("oviewModel").setProperty("/okbutton", false);
							//	that.getView().getModel("oviewModel").setProperty("/noDatafunc");
							that.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", oData.results);
						} else {
							that.getView().getModel("oviewModel").setProperty("/okbutton", true);
							that.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", oData.results);
						}
					}
				});
			},

			Equipmentpull: function () {
				this.func = sap.ui.core.Fragment.byId("measuring_point", "equip").getSelectedKey();
				var that = this;
				var filter = [];
				filter.push(new sap.ui.model.Filter("EquipmentNumber", sap.ui.model.FilterOperator.EQ,
					that.func));
				this.oDataF4.read("/MeasuringPointMasterSet", {
					filters: filter,
					success: function (oData, oResponse) {
						console.log("Equipmentpull Odata", oData);
						var length = oData.results.length;
						if (length == '0') {
							//	that.getView().getModel("oviewModel").setProperty("/noDatafunc");
							that.getView().getModel("oviewModel").setProperty("/okbutton", false);
							that.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", oData.results);
						} else {
							that.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", oData.results);
							that.getView().getModel("oviewModel").setProperty("/functable", true);
							that.getView().getModel("oviewModel").setProperty("/okbutton", true);
						}
					}
				});
			},
			measuringpointpull: function () {
				var arraymess = [];
				this.func = sap.ui.core.Fragment.byId("measuring_point", "mes").getSelectedKey();
				var that = this;
				this._oDataMeasureDocument.read("/MesPointGetDetailSet('" + that.func + "')", {

					success: function (oData, oResponse) {
						console.log("measuringpointpull Odata", oData);

						var mesp = oData.MeasuringPoint;

						var mespdes = oData.MeasuringPointDes;

						var objs = {
							MeasuringPoint: mesp,
							MeasuringPointDes: mespdes
						};

						arraymess.push(objs);

						var length = arraymess.length;

						//	var length = oData.results.length;
						if (length == '0') {
							//	that.getView().getModel("oviewModel").setProperty("/noDatafunc");
							that.getView().getModel("oviewModel").setProperty("/okbutton", false);
							that.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", arraymess);
						} else {
							that.getView().getModel("dataModelGlobal").setProperty("/Functionaltablepullset", arraymess);
							that.getView().getModel("oviewModel").setProperty("/functable", true);
							that.getView().getModel("oviewModel").setProperty("/okbutton", true);
						}

					}
				});
			},
			clearfilter: function () {
				sap.ui.core.Fragment.byId("measuring_point", "functable").getModel("dataModelGlobal").setProperty("/Functionaltablepullset",
					"");
				sap.ui.core.Fragment.byId("measuring_point", "funloc").setValue("");
				sap.ui.core.Fragment.byId("measuring_point", "subfunctech").setValue("");
				sap.ui.core.Fragment.byId("measuring_point", "equip").setValue("");
				sap.ui.core.Fragment.byId("measuring_point", "mes").setValue("");
				sap.ui.core.Fragment.byId("measuring_point", "funloc").setSelectedKey("");
				sap.ui.core.Fragment.byId("measuring_point", "subfunctech").setSelectedKey("");
				sap.ui.core.Fragment.byId("measuring_point", "equip").setSelectedKey("");
				sap.ui.core.Fragment.byId("measuring_point", "mes").setSelectedKey("");

			},
			change: function (oEvent) {
				var that = this;
				var _oInput = oEvent.getSource();
				that.len = _oInput.getValue();
				that.val = _oInput.getValue().length;
				if (that.val > 21) {
					that.l = that.len.slice(0, 21);
					that.getView().byId("reading").setValue(that.l);
				} else {

				}

			},
			meslength: function (oEvent) {
				var that = this;
				var _oInput = oEvent.getSource();
				that.len = _oInput.getValue();
				that.val = _oInput.getValue().length;
				if (that.val > 21) {
					that.l = that.len.slice(0, 21);
					that.getView().byId("Mesreading").setValue(that.l);
				} else {

				}

			},
			difflength: function (oEvent) {
				var that = this;
				var _oInput = oEvent.getSource();
				that.len = _oInput.getValue();
				that.val = _oInput.getValue().length;
				if (that.val > 21) {
					that.l = that.len.slice(0, 21);
					that.getView().byId("difference").setValue(that.l);
				} else {

				}
			},
			Livechange: function (oEvent) {
				var tctrreading = "";
				var Mes_inp = this.getView().byId("mespoint").getValue();
				var Split_Mes_inp = Mes_inp.split(" ");
				var Split_Mes_inp_las = Split_Mes_inp[0];

				var newValue = oEvent.getParameter("value");
				var counter_reading = this.getView().byId('reading').getValue();
				var target_reading = this.getView().byId('Counter').getValue();
				var last_record = this.getView().byId('Last').getValue();
				var annual = this.getView().byId('Annual').getValue();
				var target = parseFloat(last_record);
				var value = parseFloat(counter_reading);
				var that = this;
				var sMeasure = "/MesPointGetDetailSet('" + Split_Mes_inp_las + "')";
				this._oDataMeasureDocument.read(sMeasure, {
					success: function (oData, oResponse) {
						tctrreading = oData.TotalCtrReading;
						if (tctrreading === '' || annual === '') {
							if (value >= annual) {
								that.getView().byId('difference').setValue("");
								var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
								MessageBox.warning(
									"Value should be less than counter over reading", {
										styleClass: bCompact ? "sapUiSizeCompact" : ""
									}
								);
							} else {
								that.getView().byId('difference').setValue(counter_reading);
								that.getView().byId('Counter').setValue(counter_reading);
								that.getView().byId('Last').setValue(counter_reading);
							}
						} else {
							if (value <= annual && value >= tctrreading) {
								var total = +counter_reading - +tctrreading;
								var tc = counter_reading;
								total = parseFloat(total).toFixed(2);
								tc = parseFloat(tc).toFixed(2);
								that.getView().byId('difference').setValue(total);
								that.getView().byId('Counter').setValue(tc);
							} else {
								that.getView().byId('difference').setValue("");
								var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
								MessageBox.warning(
									"Value should be less than counter over reading and greater than last counter reading", {
										styleClass: bCompact ? "sapUiSizeCompact" : ""
									}
								);
							}
						}
					}
				});
			},
			ci_handleDelete: function (oEvent) {
				var path = oEvent.getParameter('listItem').getBindingContext().getPath();
				var idx = parseInt(path.substring(path.lastIndexOf('/') + 1));
				var list_ID = sap.ui.getCore().byId(oEvent.getSource().sId);

				var Data = list_ID.getModel();

				var d = Data.getData();
				d.splice(idx, 1);
				Data.setData(d);
			},

			submmit: function () {
				var counter_reading = this.getView().byId('reading').getValue();
				var target_reading = this.getView().byId('Counter').getValue();
				var diffreading = this.getView().byId('difference').getValue();
				var last_record = this.getView().byId('Last').getValue();
				var results = +diffreading + +last_record;
				this.getView().byId('reading').setValue(results);
				this.getView().byId('Counter').setValue(results);
			},

			techok: function () {
				var that = this;
				var tableid = sap.ui.core.Fragment.byId("measuring_point", "functable");
				var item = sap.ui.core.Fragment.byId("measuring_point", "functable").getSelectedItem();
				var tablelength = tableid.getSelectedItems().length;
				if (tablelength == '0') {
					//that.getView().getModel("oviewModel").setProperty("/okbutton", false);
					var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
					MessageBox.error(
						"Select measuring point ", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						}
					);
				} else {

					for (var i = 0; i < tablelength; i++) {
						var rows = tableid.getSelectedItems()[i];
						var Mespoint = rows.getCells()[0].getText();
						var MesDesption = rows.getCells()[1].getText();
						var Mess_point = that.getView().byId("mespoint").setValue(Mespoint + " " + MesDesption);
						//	var Mess_descr = that.getView().byId("Decription").setText(MesDesption);
					}

					var sMeasure = "/MesPointGetDetailSet('" + Mespoint + "')";
					this._oDataMeasureDocument.read(sMeasure, {
						success: function (oData, oResponse) {
							console.log("MesPointGetDetailSet", oData);
							that.getView().byId("description").setValue("")
							var equip = oData.EquipmentNumber;
							that.counter = oData.Counter;
							var codegrp = oData.CodeGrp;
							that.last = oData.TotalCtrReading;
							that.Annual = oData.CounterReading;
							if (codegrp === '') {
								that.getView().getModel("oviewModel").setProperty("/valuationcode", false);
								that.getView().getModel("oviewModel").setProperty("/pointercodegrp", false);
							} else {
								var oModel1 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/zpm_f4_srv/", true);
								var sPath = "/CodeGroupSet?$filter=Catalog eq '' and CodeGrp eq '" + codegrp + "'";
								oModel1.read(sPath, {
									success: function (oData, oResponse) {
										that.getView().getModel("dataModelGlobal").setSizeLimit(1500);
										that.getView().getModel("dataModelGlobal").setProperty("/code", oData.results);
									}
								});
								that.getView().getModel("oviewModel").setProperty("/valuationcode", true);
								that.getView().getModel("oviewModel").setProperty("/pointercodegrp", true);
							}
							if (that.counter === 'X') {
								if (that.Annual === '') {
									that.getView().byId("reading").setValue("");
									that.getView().byId("difference").setValue("");
									that.getView().byId("Last").setValue(that.last);
									that.getView().getModel("oviewModel").setProperty("/counterdata", true);
									that.getView().getModel("oviewModel").setProperty("/pointerdata", false);
									that.getView().getModel("oviewModel").setProperty("/description", true);
									//	that.getView().byId("Last").setValue(oData.CounterReading);
									that.getView().getModel("dataModelGlobal").setProperty("/LastCounterreading", oData.CounterReading);
									that.getView().byId("Annual").setValue("");
									that.getView().getModel("oviewModel").setProperty("/Annual", false);
									that.getView().getModel("oviewModel").setProperty("/funcequip", false);
									that.getView().getModel("oviewModel").setProperty("/upload", true);
									that.getView().byId("UploadCollection").setNoDataText("Use the 'Upload' button for upload the documents");
								} else {
									that.getView().byId("Annual").setValue(that.Annual);
									that.getView().getModel("oviewModel").setProperty("/Annual", true);
									that.getView().byId("reading").setValue("");
									that.getView().byId("difference").setValue("");
									that.getView().byId("Last").setValue(that.last);
									that.getView().getModel("oviewModel").setProperty("/counterdata", true);
									that.getView().getModel("oviewModel").setProperty("/pointerdata", false);
									that.getView().getModel("oviewModel").setProperty("/description", true);
									that.getView().getModel("oviewModel").setProperty("/funcequip", false);
									that.getView().getModel("oviewModel").setProperty("/upload", true);
									that.getView().byId("UploadCollection").setNoDataText("Use the 'Upload' button for upload the documents");
									//	that.getView().byId("Last").setValue(oData.CounterReading);
									that.getView().getModel("dataModelGlobal").setProperty("/LastCounterreading", oData.CounterReading);
								}

							} else {
								that.getView().byId("Mesreading").setValue("");
								that.getView().getModel("oviewModel").setProperty("/pointerdata", true);
								that.getView().getModel("oviewModel").setProperty("/counterdata", false);
								that.getView().getModel("oviewModel").setProperty("/targetvalue", true);
								that.getView().getModel("oviewModel").setProperty("/mesreading", true);
								that.getView().getModel("oviewModel").setProperty("/description", true);
								that.getView().getModel("oviewModel").setProperty("/funcequip", false);
								that.getView().getModel("oviewModel").setProperty("/upload", true);
								that.getView().byId("UploadCollection").setNoDataText("Use the 'Upload' button for upload the documents");
							}
							if (equip === '') {
								//	that.getView().getModel("oviewModel").setProperty("/createbutton", true);
								that.getView().getModel("oviewModel").setProperty("/generaldata", true);
								that.getView().getModel("oviewModel").setProperty("/documenthistory", true);
								that.getView().getModel("oviewModel").setProperty("/attachment", true);
								that.getView().getModel("oviewModel").setProperty("/equipment", false);
								that.getView().getModel("oviewModel").setProperty("/functionllocation", true);
								that.getView().getModel("oviewModel").setProperty("/funcequip", false);
								that.getView().getModel("oviewModel").setProperty("/upload", true);
								that.getView().byId("UploadCollection").setNoDataText("Use the 'Upload' button for upload the documents");

							} else {
								//	that.getView().getModel("oviewModel").setProperty("/createbutton", true);
								that.getView().getModel("oviewModel").setProperty("/generaldata", true);
								that.getView().getModel("oviewModel").setProperty("/documenthistory", true);
								that.getView().getModel("oviewModel").setProperty("/equipment", true);
								that.getView().getModel("oviewModel").setProperty("/attachment", true);
								that.getView().getModel("oviewModel").setProperty("/funcequip", false);
								that.getView().getModel("oviewModel").setProperty("/functionllocation", false);
								that.getView().getModel("oviewModel").setProperty("/upload", true);
								that.getView().byId("UploadCollection").setNoDataText("Use the 'Upload' button for upload the documents");

							}
							that.getView().getModel("dataModelGlobal").setProperty("/Measurepulldeta", oData);
							that.getView().byId("Counter").setValue(oData.TotalCtrReading);
							that.getView().byId("valuationgrp").setValue(oData.CodeGrp);
							that.getView().byId("targetvalue").setValue(oData.TargetValue);
							that.getView().byId("pointercode").setValue(oData.CodeGrp + " " + oData.CodeGroupDes);
							that.date_arr1 = [];
							var filter = [];
							filter.push(new sap.ui.model.Filter("Point", sap.ui.model.FilterOperator.EQ,
								Mespoint));
							that._oDataMeasureDocument.read("/MeasuringDocumentHistorySet", {
								filters: filter,
								success: function (oData, oResponse) {
									//that.getView().getModel("dataModelGlobal").setProperty("/enteredPernrUserID", oData.Employee.UserID);
									that.getView().getModel("dataModelGlobal").setProperty("/documenthistory", oData.results);

								}
							});
						}
					});
					this.measuringpoint.close();
					this.getView().byId("savevar").setEnabled(true);
					this.getView().byId("createmesdoc").setEnabled(true);
				}

			},
			_onFileUploaderChange: function () {
				var oFileuploader = this.getView().byId("ci_fileUploader1");
				this.ci_attach1 = this.getView().byId("UploadCollection");
				var len = oFileuploader.length;
				var sFilename = oFileuploader.getValue();
				//	baseval = [" "," "," "," "," "];
				var file = jQuery.sap.domById(oFileuploader.getId() + "-fu").files[0];
				var base64_marker = 'data:' + file.type + ';base64,';
				var filename = sFilename.replace(/(\.[^/.]+)+$/, ""); // File Name
				var fileext = sFilename.slice((sFilename.lastIndexOf(".") - 1 >>> 0) + 2); // File Extension
				var sfileext = fileext.substring(0, 3);
				var tsfileext = sfileext.toUpperCase();
				var that = this;
				if (file) {
					var reader = new FileReader();
					reader.onload = function (readerEvt) {
						var binaryString = readerEvt.target.result;
						var base64 = btoa(binaryString);

						oFileuploader.setValue();

						that.baseval.push(base64);

						that.ci_obj1 = {
							Name: filename,
							Ext: tsfileext,
							Base64: base64
						};
						that.ci_att1.push(that.ci_obj1);

						var oModel = new sap.ui.model.json.JSONModel(that.ci_att1);

						that.ci_attach1.setModel(oModel);
						var oItems = new sap.m.ObjectListItem({
							icon: {
								path: "Ext",
								formatter: function (subject) {
									var lv = subject;
									if (lv === 'TXT') {
										return "sap-icon://document-text";
									} else if (lv === 'JPG' || lv === 'PNG' || lv === 'BMP') {
										return "sap-icon://attachment-photo";
									} else if (lv === 'PDF') {
										return "sap-icon://pdf-attachment";
									} else if (lv === 'DOC') {
										return "sap-icon://doc-attachment";
									} else if (lv === 'XLS') {
										return "sap-icon://excel-attachment";
									} else if (lv === 'MP3') {
										return "sap-icon://attachment-audio";
									} else if (lv === 'XLS') {
										return "sap-icon://excel-attachment";
									} else if (lv === 'PPT') {
										return "sap-icon://ppt-attachment";
									} else {
										return "sap-icon://document";
									}

								}
							},
							title: "{Name}.{Ext}",
							type: "Active",
						});
						that.ci_attach1.bindItems("/", oItems);
						that.getView().getModel("dataModelGlobal").setProperty("/ci_att1", that.ci_att1);
					};
				};
				reader.readAsBinaryString(file);
			},
			List: function (oEvent) {

				var oButton = oEvent.getSource();
				// create popover
				if (!this._oPopover) {
					Fragment.load({
						id: "popoverNavCon",
						name: "com.sap.build.ba293bd41-us_1.createMeasuringPointGrunt.fragments.Measuring_Document_List",

						controller: this
					}).then(function (oPopover) {
						this._oPopover = oPopover;
						this.getView().addDependent(this._oPopover);
						this._oPopover.openBy(oButton);
					}.bind(this));
				} else {
					this._oPopover.openBy(oButton);
				}

				/*	var that = this;
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.show(
						"Do you want to List the Document ?", {
							//	        icon: sap.m.MessageBox.Icon.INFORMATION,
							title: "Information Message",
							actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
							onClose: function (oAction) {
								// notify user

								if (oAction === "YES") {

									that.documentList.open();*/

				//alert("clicked");
				//var navUrl =
				//	"https://createmaintenancedocument-ba293bd41.dispatcher.us1.hana.ondemand.com/webapp/test/testFLPService.html?hc_reset#BUILD-prototype"
				/*								var navUrl =
													"https://displaymaintenancedocument-ba293bd41.dispatcher.us1.hana.ondemand.com/webapp/test/testFLPService.html?hc_reset#BUILD-prototype"
													//Navigate to second view
												sap.m.URLHelper.redirect(navUrl, true);*/

				/*						} else(oAction === "NO");

										{
											//	alert("no actions")
										}
									}
								});*/

			},

			onNavToProduct: function (oEvent) {
				var oCtx = oEvent.getSource().getBindingContext();
				console.log("oCtx", oCtx);
				var oNavCon = Fragment.byId("popoverNavCon", "navCon");
				console.log("oNavCon", oNavCon);
				var oDetailPage = Fragment.byId("popoverNavCon", "detail");
				console.log("oDetailPage", oDetailPage);
				oNavCon.to(oDetailPage);
				oDetailPage.bindElement(oCtx.getPath());
				this._oPopover.focus();
			},

			onNavBack: function () {

				var oNavCon = Fragment.byId("popoverNavCon", "navCon");
				oNavCon.back();
				this._oPopover.focus();

			},

			DMS: function () {
				var that = this;
				that.description_doc = that.getView().byId("description").getValue();
				that.ci_att1 = that.getView().getModel("dataModelGlobal").getProperty("/ci_att1");
				var oUploadCollection = that.getView().byId("UploadCollection");
				var arr1 = [];
				var arrp = [];
				var count = that.ci_att1.length;
				for (var i = 0; i < count; i++) {
					var dmsdata = {
						"DocType": that.ci_att1[i].Ext,
						"FileName": that.ci_att1[i].Name,
						"Base64": that.ci_att1[i].Base64
					};
					arr1.push(dmsdata);
				}
				that.num = that.msg1;
				that.notnumber = this.num.slice(18, 26);
				var obj = {
					"d": {
						"ProcessName": "Measuring Document",
						"Description": that.description_doc,
						"Username": that.userId,
						"NotificationNo": that.notnumber,
						"To_DMSItems": arr1,
					}
				};
				arrp.push(obj);
				var oModel1 = new ODataModel("/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/", true);
				var sPath = "/DMS_HeaderSet";

				oModel1.create(sPath, obj, {
					success: function (oData, oResponse) {
						var msg = oData.ReturnMessage;
						var typ = oData.ReturnType;
						if (typ == "S") {
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.confirm(msg, {
								icon: sap.m.MessageBox.Icon.SUCCESS,
								title: "Success",
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function (oAction) {
									if (oAction == "OK") {
										window.location.reload();
									}
								}
							});

						} else {
							sap.m.MessageBox.warning(msg, {
								icon: sap.m.MessageBox.Icon.WARNING,
								title: "Warning",
								actions: [sap.m.MessageBox.Action.OK],

								onClose: function (oAction) {

									if (oAction == "OK") {
										window.location.reload();

									}
								}

							});

						}

					}
				});

			},
			handleValueHelp: function () {

				this.measuringpoint.open();

			},

			HomeButton: function () {

				var that = this;
				sap.m.MessageBox.show(
					"Do you want to exit?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirmation Message",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function (oAction) {
							if (oAction === "YES") {

								window.location.replace(
									"https://dashboarddesigngrunt-ba293bd41.dispatcher.us1.hana.ondemand.com/index.html?hc_reset#/PM"
								);
							}
						}
					});
			},

			canceltecch: function () {
				this.measuringpoint.close();
			},
			post_document: function () {
				var that = this;
				if (that.counter === '' || that.count_point === '') {
					that.arrayOfItems = [];
					var Mes_reading = that.getView().byId("Mesreading").getValue();
					var short_text = that.getView().byId("description").getValue();
					var targetvalue = that.getView().byId("Mesreading").getValue();
					that.targetvalue = targetvalue.replace(".", ",");
					var MeasurementPoints = that.getView().byId("mespoint").getValue();
					console.log("MeasurementPoints", MeasurementPoints);

					var Splitequip_MeasurementPoint = MeasurementPoints.split(" ");
					console.log("Splitequip_MeasurementPoint", Splitequip_MeasurementPoint);

					var MeasurementPoint = Splitequip_MeasurementPoint[0];
					console.log("MeasurementPoint", MeasurementPoint);

					var ValuationCode = that.getView().byId("pointercodegrp").getSelectedKey();
					if (Mes_reading === '') {

						var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
						MessageBox.information(
							"Enter the measurement reading value", {
								styleClass: bCompact ? "sapUiSizeCompact" : ""
							}
						);
					} else {
						that.getView().getModel("oGlobalModel").setProperty("/deLay", true);
						sap.m.MessageBox.show(
							"Do you want to create measuring document ?", {
								icon: sap.m.MessageBox.Icon.INFORMATION,
								title: "Confirmation Message",
								actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
								onClose: function (oAction) {
									// notify user
									if (oAction === "YES") {

										var postdata = {
											"ShortText": short_text,
											"RecordedValue": that.targetvalue,
											"MeasurementPoint": MeasurementPoint,
											"ValuationCode": ValuationCode
										};
										console.log("postdata", postdata);
										var oModel_create = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPM_MEASURE_DOCUMENT_SRV/", true);
										var sPath = "/CreateMeasuringDocument001Set";
										oModel_create.create(sPath, postdata, {
											success: function (oData, oResponse) {
												that.getView().getModel("oGlobalModel").setProperty("/deLay", false);
												console.log("oData", oData)
												that.msg1 = oData.Message;
												var type = oData.Type;
												if (type === 'S') {
													jQuery.sap.require("sap.m.MessageBox");
													sap.m.MessageBox.confirm(that.msg1, {
														icon: sap.m.MessageBox.Icon.SUCCESS,
														title: "Success",
														actions: [sap.m.MessageBox.Action.OK],
														onClose: function (oAction) {
															if (oAction == "OK") {
																if (oAction == "OK") {
																	that.ci_att1 = that.getView().byId("UploadCollection").getItems().length;

																	if (that.ci_att1 == '0') {
																		window.location.reload();
																	} else {
																		that.DMS();
																	}
																}
															}
														}

													});
												} else {
													jQuery.sap.require("sap.m.MessageBox");
													sap.m.MessageBox.warning(that.msg1, {
														icon: sap.m.MessageBox.Icon.warning,
														title: "Warning",
														actions: [sap.m.MessageBox.Action.OK],
														onClose: function (oAction) {
															if (oAction == "OK") {

															}
														}
													});
												}

											}
										});
									} else if (oAction === "NO") {

										that.getView().getModel("oGlobalModel").setProperty("/deLay", false);

									}
								}
							});
					}

				} else {

					this.arrayOfItems = [];
					var Tar_reading = this.getView().byId("reading").getValue();
					var short_text = this.getView().byId("description").getValue();
					var RecordedValue = this.getView().byId("Counter").getValue();
					that.RecordedValue = RecordedValue.replace(".", ",");
					var MeasurementPoints = this.getView().byId("mespoint").getValue();

					var Splitequip_MeasurementPoint = MeasurementPoints.split(" ");
					console.log("Splitequip_MeasurementPoint", Splitequip_MeasurementPoint);

					var MeasurementPoint = Splitequip_MeasurementPoint[0];
					console.log("MeasurementPoint", MeasurementPoint);

					var ValuationCode = this.getView().byId("valcode").getSelectedKey();
					if (Tar_reading === '') {

						var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
						MessageBox.alert(
							"Enter either a counter reading or a counter reading difference", {
								styleClass: bCompact ? "sapUiSizeCompact" : ""
							}
						);
					} else {
						that.getView().getModel("oGlobalModel").setProperty("/deLay", true);
						sap.m.MessageBox.show(
							"Do you want to create measuring document ?", {
								icon: sap.m.MessageBox.Icon.INFORMATION,
								title: "Confirmation Message",
								actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
								onClose: function (oAction) {
									// notify user
									if (oAction === "YES") {

										var postdata = {
											"ShortText": short_text,
											"RecordedValue": that.RecordedValue,
											"MeasurementPoint": MeasurementPoint,
											"ValuationCode": ValuationCode
										};
										console.log("postdata", postdata);
										var oModel1 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPM_MEASURE_DOCUMENT_SRV/", true);
										var sPath = "/CreateMeasuringDocument001Set";
										oModel1.create(sPath, postdata, {
											success: function (oData, oResponse) {
												that.getView().getModel("oGlobalModel").setProperty("/deLay", false);
												console.log("oData2", oData)
												that.msg1 = oData.Message;
												var type = oData.Type;
												if (type === 'S') {
													jQuery.sap.require("sap.m.MessageBox");
													sap.m.MessageBox.confirm(that.msg1, {
														icon: sap.m.MessageBox.Icon.SUCCESS,
														title: "Success",
														actions: [sap.m.MessageBox.Action.OK],
														onClose: function (oAction) {
															if (oAction == "OK") {
																that.ci_att1 = that.getView().byId("UploadCollection").getItems().length;

																if (that.ci_att1 == '0') {
																	window.location.reload();
																} else {
																	that.DMS();
																}

															}
														}
													});
												} else {
													jQuery.sap.require("sap.m.MessageBox");
													sap.m.MessageBox.warning(that.msg1, {
														icon: sap.m.MessageBox.Icon.warning,
														title: "Warning",
														actions: [sap.m.MessageBox.Action.OK],
														onClose: function (oAction) {
															if (oAction == "OK") {

															}
														}
													});
												}
											}

										});
									} else if (oAction === "NO") {

										that.getView().getModel("oGlobalModel").setProperty("/deLay", false);

									}
								}
							});
					}

				}

			}

		});
	},
	/* bExport= */
	true);