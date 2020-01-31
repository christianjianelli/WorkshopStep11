sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("com.cgi.workshop.fiori.controller.Master", {

		_actionPerformed: "",

		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.cgi.workshop.fiori.view.ConfirmDialog", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},

		onOpenDialog: function () {
			this._getDialog().open();
		},

		onCloseDialog: function () {
			this._getDialog().close();
		},

		onRefresh: function () {
			this._actionPerformed = "refresh";
			this.onOpenDialog();
		},

		onDelete: function () {
			this._actionPerformed = "delete";
			this.onOpenDialog();
		},

		onConfirm: function () {

			this.onCloseDialog();

			var oBundle = this.getView().getModel("i18n").getResourceBundle();

			if (this._actionPerformed === "refresh") {
				
				//MessageToast.show(oBundle.getText("refreshConfirmed"));
				
				//this.getView().getModel().refresh();
				
				var oView = this.getView();
				var oModel = oView.getModel();
				oModel.refresh();
				
			}

			if (this._actionPerformed === "delete") {
				
				MessageToast.show(oBundle.getText("deleteConfirmed"));
				
				//this.getView().getModel().remove("/Customers('ALFKI')");
				
			}
		},

		onDisplay: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var oView = this.getView();

			var oList = oView.byId("customerList");
			
			var oItem = oList.getSelectedItem();

			if (oItem !== null) {

				oRouter.navTo("detail", {
					objectKey: oItem.getDescription()
				});

			} else {
				
				MessageToast.show("Please select a Customer");
				
			} 

		}
	});
});