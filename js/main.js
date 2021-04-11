"use strict";
var BrakePadLifeCalc = /** @class */ (function () {
    function BrakePadLifeCalc() {
        var _this = this;
        // setup clear event
        var btn = document.getElementById("btnClear");
        if (btn !== null)
            btn.addEventListener("click", function (e) { return _this.clearValues(); });
        // setup events for leaving text fields
        var txt = document.getElementById("txtCurrentMileage");
        if (txt !== null)
            txt.addEventListener("blur", function (e) { return _this.calculateValues(); });
        var txtLowestBrakePadMeasurementFront = document.getElementById("txtLowestBrakePadMeasurementFront");
        if (txtLowestBrakePadMeasurementFront !== null)
            txtLowestBrakePadMeasurementFront.addEventListener("blur", function (e) { return _this.calculateValues(); });
        var txtLowestBrakePadMeasurementRear = document.getElementById("txtLowestBrakePadMeasurementRear");
        if (txtLowestBrakePadMeasurementRear !== null)
            txtLowestBrakePadMeasurementRear.addEventListener("blur", function (e) { return _this.calculateValues(); });
        var txtMileageWhenLastReplacedFront = document.getElementById("txtMileageWhenLastReplacedFront");
        if (txtMileageWhenLastReplacedFront !== null)
            txtMileageWhenLastReplacedFront.addEventListener("blur", function (e) { return _this.calculateValues(); });
        var txtMileageWhenLastReplacedRear = document.getElementById("txtMileageWhenLastReplacedRear");
        if (txtMileageWhenLastReplacedRear !== null)
            txtMileageWhenLastReplacedRear.addEventListener("blur", function (e) { return _this.calculateValues(); });
    }
    BrakePadLifeCalc.prototype.clearValues = function () {
        // clear input fields
        document.getElementById("txtCurrentMileage").value = "";
        document.getElementById("txtLowestBrakePadMeasurementFront").value = "";
        document.getElementById("txtLowestBrakePadMeasurementRear").value = "";
        document.getElementById("txtMileageWhenLastReplacedFront").value = "";
        document.getElementById("txtMileageWhenLastReplacedRear").value = "";
        // reset spans
        document.getElementById("pctBrakePadMaterialRemainingFront").textContent = "0%";
        document.getElementById("pctBrakePadMaterialRemainingRear").textContent = "0%";
        document.getElementById("approxLifeOfBrakePadsFront").textContent = "0";
        document.getElementById("approxLifeOfBrakePadsRear").textContent = "0";
        document.getElementById("howManyMoreMilesUntil0Front").textContent = "0";
        document.getElementById("howManyMoreMilesUntil0Rear").textContent = "0";
        document.getElementById("atWhatMileage0Front").textContent = "0";
        document.getElementById("atWhatMileage0Rear").textContent = "0";
        document.getElementById("howManyMoreMilesUntil10Front").textContent = "0";
        document.getElementById("howManyMoreMilesUntil10Rear").textContent = "0";
        document.getElementById("atWhatMileage10Front").textContent = "0";
        document.getElementById("atWhatMileage10Rear").textContent = "0";
        document.getElementById("howManyMoreMilesUntil20Front").textContent = "0";
        document.getElementById("howManyMoreMilesUntil20Rear").textContent = "0";
        document.getElementById("atWhatMileage20Front").textContent = "0";
        document.getElementById("atWhatMileage20Rear").textContent = "0";
        document.getElementById("howManyMoreMilesUntil30Front").textContent = "0";
        document.getElementById("howManyMoreMilesUntil30Rear").textContent = "0";
        document.getElementById("atWhatMileage30Front").textContent = "0";
        document.getElementById("atWhatMileage30Rear").textContent = "0";
    };
    BrakePadLifeCalc.prototype.calculateValues = function () {
        console.log("calculateValues");
        // calculate pctBrakePadMaterialRemainingFront which is txtLowestBrakePadMeasurementFront / 12
        var val = document.getElementById("txtLowestBrakePadMeasurementFront").value;
        if (this.isNumeric(val)) {
            var numericVal = +val;
            var percent = Math.round(numericVal / 12 * 100);
            document.getElementById("pctBrakePadMaterialRemainingFront").textContent = percent.toString() + "%";
        }
        // calculate pctBrakePadMaterialRemainingFront which is txtLowestBrakePadMeasurementFront / 12
        val = document.getElementById("txtLowestBrakePadMeasurementRear").value;
        if (this.isNumeric(val)) {
            var numericVal = +val;
            var percent = Math.round(numericVal / 12 * 100);
            document.getElementById("pctBrakePadMaterialRemainingRear").textContent = percent.toString() + "%";
        }
        var allValid = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedFront", "txtLowestBrakePadMeasurementFront"]);
        if (allValid) {
            var currentMileage = +document.getElementById("txtCurrentMileage").value;
            var mileageWhenLastReplacedFront = +document.getElementById("txtMileageWhenLastReplacedFront").value;
            var lowestBrakePadMeasurementFront = +document.getElementById("txtLowestBrakePadMeasurementFront").value;
            var result = ((currentMileage - mileageWhenLastReplacedFront) / ((12 - lowestBrakePadMeasurementFront) / 12)) - (currentMileage - mileageWhenLastReplacedFront);
            document.getElementById("howManyMoreMilesUntil0Front").textContent = this.formatNumber(result);
        }
        allValid = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedRear", "txtLowestBrakePadMeasurementRear"]);
        if (allValid) {
            var currentMileage = +document.getElementById("txtCurrentMileage").value;
            var mileageWhenLastReplacedRear = +document.getElementById("txtMileageWhenLastReplacedRear").value;
            var lowestBrakePadMeasurementRear = +document.getElementById("txtLowestBrakePadMeasurementRear").value;
            var result = ((currentMileage - mileageWhenLastReplacedRear) / ((12 - lowestBrakePadMeasurementRear) / 12)) - (currentMileage - mileageWhenLastReplacedRear);
            document.getElementById("howManyMoreMilesUntil0Rear").textContent = this.formatNumber(result);
        }
        // approxLifeOfBrakePadsFront = currentMileage - txtMileageWhenLastReplacedFront + howManyMoreMilesUntil0Front
        allValid = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedFront", "howManyMoreMilesUntil0Front"]);
        if (allValid) {
            var currentMileage = +document.getElementById("txtCurrentMileage").value;
            var mileageWhenLastReplacedFront = +document.getElementById("txtMileageWhenLastReplacedFront").value;
            var howManyMoreMilesUntil0Rear = this.getLabelValue("howManyMoreMilesUntil0Front");
            var result = currentMileage - mileageWhenLastReplacedFront + howManyMoreMilesUntil0Rear;
            document.getElementById("approxLifeOfBrakePadsFront").textContent = this.formatNumber(result);
        }
        // approxLifeOfBrakePadsRear = currentMileage - txtMileageWhenLastReplacedRear + howManyMoreMilesUntil0Rear
        allValid = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedRear", "howManyMoreMilesUntil0Rear"]);
        if (allValid) {
            var currentMileage = +document.getElementById("txtCurrentMileage").value;
            var mileageWhenLastReplacedRear = +document.getElementById("txtMileageWhenLastReplacedRear").value;
            var howManyMoreMilesUntil0Rear = this.getLabelValue("howManyMoreMilesUntil0Rear");
            var result = currentMileage - mileageWhenLastReplacedRear + howManyMoreMilesUntil0Rear;
            document.getElementById("approxLifeOfBrakePadsRear").textContent = this.formatNumber(result);
        }
        // atWhatMileage0Front = howManyMoreMilesUntil0Rear + currentMileage
        allValid = this.inputValid(["txtCurrentMileage", "howManyMoreMilesUntil0Front"]);
        if (allValid) {
            var currentMileage = +document.getElementById("txtCurrentMileage").value;
            var howManyMoreMilesUntil0Rear = this.getLabelValue("howManyMoreMilesUntil0Front");
            var result = currentMileage + howManyMoreMilesUntil0Rear;
            document.getElementById("atWhatMileage0Front").textContent = this.formatNumber(result);
        }
        // atWhatMileage0Rear = howManyMoreMilesUntil0Rear + currentMileage
        allValid = this.inputValid(["txtCurrentMileage", "howManyMoreMilesUntil0Rear"]);
        if (allValid) {
            var currentMileage = +document.getElementById("txtCurrentMileage").value;
            var howManyMoreMilesUntil0Rear = this.getLabelValue("howManyMoreMilesUntil0Rear");
            var result = currentMileage + howManyMoreMilesUntil0Rear;
            document.getElementById("atWhatMileage0Rear").textContent = this.formatNumber(result);
        }
        // 10% row
        // atWhatMileage10Front = approxLifeOfBrakePadsFront * 0.9 + txtMileageWhenLastReplacedFront
        allValid = this.inputValid(["approxLifeOfBrakePadsFront", "txtMileageWhenLastReplacedFront"]);
        if (allValid) {
            var txtMileageWhenLastReplacedFront = +document.getElementById("txtMileageWhenLastReplacedFront").value;
            var approxLifeOfBrakePadsFront = this.getLabelValue("approxLifeOfBrakePadsFront");
            var result = approxLifeOfBrakePadsFront * 0.9 + txtMileageWhenLastReplacedFront;
            document.getElementById("atWhatMileage10Front").textContent = this.formatNumber(result);
        }
        // atWhatMileage10Rear = approxLifeOfBrakePadsRear * 0.9 + txtMileageWhenLastReplacedRear
        allValid = this.inputValid(["approxLifeOfBrakePadsRear", "txtMileageWhenLastReplacedRear"]);
        if (allValid) {
            var txtMileageWhenLastReplacedRear = +document.getElementById("txtMileageWhenLastReplacedRear").value;
            var approxLifeOfBrakePadsRear = this.getLabelValue("approxLifeOfBrakePadsRear");
            var result = approxLifeOfBrakePadsRear * 0.9 + txtMileageWhenLastReplacedRear;
            document.getElementById("atWhatMileage10Rear").textContent = this.formatNumber(result);
        }
        // howManyMoreMilesUntil10Front = atWhatMileage10Front - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage10Front", "txtCurrentMileage"]);
        if (allValid) {
            var txtCurrentMileage = +document.getElementById("txtCurrentMileage").value;
            var atWhatMileage10Front = this.getLabelValue("atWhatMileage10Front");
            var result = atWhatMileage10Front - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil10Front").textContent = this.formatNumber(result);
        }
        // howManyMoreMilesUntil10Rear = atWhatMileage10Rear - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage10Rear", "txtCurrentMileage"]);
        if (allValid) {
            var txtCurrentMileage = +document.getElementById("txtCurrentMileage").value;
            var atWhatMileage10Rear = this.getLabelValue("atWhatMileage10Rear");
            var result = atWhatMileage10Rear - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil10Rear").textContent = this.formatNumber(result);
        }
        // 20% row
        // atWhatMileage20Front = approxLifeOfBrakePadsFront * 0.8 + txtMileageWhenLastReplacedFront
        allValid = this.inputValid(["approxLifeOfBrakePadsFront", "txtMileageWhenLastReplacedFront"]);
        if (allValid) {
            var txtMileageWhenLastReplacedFront = +document.getElementById("txtMileageWhenLastReplacedFront").value;
            var approxLifeOfBrakePadsFront = this.getLabelValue("approxLifeOfBrakePadsFront");
            var result = approxLifeOfBrakePadsFront * 0.8 + txtMileageWhenLastReplacedFront;
            document.getElementById("atWhatMileage20Front").textContent = this.formatNumber(result);
        }
        // atWhatMileage20Rear = approxLifeOfBrakePadsRear * 0.8 + txtMileageWhenLastReplacedRear
        allValid = this.inputValid(["approxLifeOfBrakePadsRear", "txtMileageWhenLastReplacedRear"]);
        if (allValid) {
            var txtMileageWhenLastReplacedRear = +document.getElementById("txtMileageWhenLastReplacedRear").value;
            var approxLifeOfBrakePadsRear = this.getLabelValue("approxLifeOfBrakePadsRear");
            var result = approxLifeOfBrakePadsRear * 0.8 + txtMileageWhenLastReplacedRear;
            document.getElementById("atWhatMileage20Rear").textContent = this.formatNumber(result);
        }
        // howManyMoreMilesUntil20Front = atWhatMileage20Front - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage20Front", "txtCurrentMileage"]);
        if (allValid) {
            var txtCurrentMileage = +document.getElementById("txtCurrentMileage").value;
            var atWhatMileage20Front = this.getLabelValue("atWhatMileage20Front");
            var result = atWhatMileage20Front - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil20Front").textContent = this.formatNumber(result);
        }
        // howManyMoreMilesUntil20Rear = atWhatMileage20Rear - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage20Rear", "txtCurrentMileage"]);
        if (allValid) {
            var txtCurrentMileage = +document.getElementById("txtCurrentMileage").value;
            var atWhatMileage20Rear = this.getLabelValue("atWhatMileage20Rear");
            var result = atWhatMileage20Rear - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil20Rear").textContent = this.formatNumber(result);
        }
        // 30% row
        // atWhatMileage30Front = approxLifeOfBrakePadsFront * 0.7 + txtMileageWhenLastReplacedFront
        allValid = this.inputValid(["approxLifeOfBrakePadsFront", "txtMileageWhenLastReplacedFront"]);
        if (allValid) {
            var txtMileageWhenLastReplacedFront = +document.getElementById("txtMileageWhenLastReplacedFront").value;
            var approxLifeOfBrakePadsFront = this.getLabelValue("approxLifeOfBrakePadsFront");
            var result = approxLifeOfBrakePadsFront * 0.7 + txtMileageWhenLastReplacedFront;
            document.getElementById("atWhatMileage30Front").textContent = this.formatNumber(result);
        }
        // atWhatMileage30Rear = approxLifeOfBrakePadsRear * 0.7 + txtMileageWhenLastReplacedRear
        allValid = this.inputValid(["approxLifeOfBrakePadsRear", "txtMileageWhenLastReplacedRear"]);
        if (allValid) {
            var txtMileageWhenLastReplacedRear = +document.getElementById("txtMileageWhenLastReplacedRear").value;
            var approxLifeOfBrakePadsRear = this.getLabelValue("approxLifeOfBrakePadsRear");
            var result = approxLifeOfBrakePadsRear * 0.7 + txtMileageWhenLastReplacedRear;
            document.getElementById("atWhatMileage30Rear").textContent = this.formatNumber(result);
        }
        // howManyMoreMilesUntil30Front = atWhatMileage30Front - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage30Front", "txtCurrentMileage"]);
        if (allValid) {
            var txtCurrentMileage = +document.getElementById("txtCurrentMileage").value;
            var atWhatMileage30Front = this.getLabelValue("atWhatMileage30Front");
            var result = atWhatMileage30Front - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil30Front").textContent = this.formatNumber(result);
        }
        // howManyMoreMilesUntil30Rear = atWhatMileage30Rear - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage30Rear", "txtCurrentMileage"]);
        if (allValid) {
            var txtCurrentMileage = +document.getElementById("txtCurrentMileage").value;
            var atWhatMileage30Rear = this.getLabelValue("atWhatMileage30Rear");
            var result = atWhatMileage30Rear - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil30Rear").textContent = this.formatNumber(result);
        }
    };
    BrakePadLifeCalc.prototype.inputValid = function (elements) {
        var _this = this;
        // check to see that input value is valid and numeric
        elements.forEach(function (element) {
            var val = document.getElementById(element).value;
            if (_this.isNumeric(val) == false)
                return false;
        });
        return true;
    };
    BrakePadLifeCalc.prototype.labelValid = function (elements) {
        var _this = this;
        // check to see that input value is valid and numeric
        elements.forEach(function (element) {
            var val = document.getElementById(element).value;
            if (_this.isNumeric(val) == false)
                return false;
        });
        return true;
    };
    BrakePadLifeCalc.prototype.isNumeric = function (num) {
        return !isNaN(num);
    };
    BrakePadLifeCalc.prototype.formatNumber = function (x) {
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    BrakePadLifeCalc.prototype.getLabelValue = function (elementId) {
        var textContent = document.getElementById(elementId).textContent;
        return parseInt(textContent.replace(/,/g, ''), 10);
    };
    return BrakePadLifeCalc;
}());
new BrakePadLifeCalc();
//# sourceMappingURL=main.js.map