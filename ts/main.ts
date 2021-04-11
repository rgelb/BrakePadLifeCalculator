
class BrakePadLifeCalc {
    constructor() {

        // setup clear event
        let btn = document.getElementById("btnClear");
        if (btn !== null) btn.addEventListener("click", (e:Event) => this.clearValues());

        // setup events for leaving text fields
        let txt = document.getElementById("txtCurrentMileage");
        if (txt !== null) txt.addEventListener("blur", (e:Event) => this.calculateValues());

        let txtLowestBrakePadMeasurementFront = document.getElementById("txtLowestBrakePadMeasurementFront");
        if (txtLowestBrakePadMeasurementFront !== null) txtLowestBrakePadMeasurementFront.addEventListener("blur", (e:Event) => this.calculateValues());

        let txtLowestBrakePadMeasurementRear = document.getElementById("txtLowestBrakePadMeasurementRear");
        if (txtLowestBrakePadMeasurementRear !== null) txtLowestBrakePadMeasurementRear.addEventListener("blur", (e:Event) => this.calculateValues());      
        
        let txtMileageWhenLastReplacedFront = document.getElementById("txtMileageWhenLastReplacedFront");
        if (txtMileageWhenLastReplacedFront !== null) txtMileageWhenLastReplacedFront.addEventListener("blur", (e:Event) => this.calculateValues());  
        
        let txtMileageWhenLastReplacedRear = document.getElementById("txtMileageWhenLastReplacedRear");
        if (txtMileageWhenLastReplacedRear !== null) txtMileageWhenLastReplacedRear.addEventListener("blur", (e:Event) => this.calculateValues());          

    }

    clearValues(): void {

        // clear input fields
        (<HTMLInputElement>document.getElementById("txtCurrentMileage")).value = "";
        (<HTMLInputElement>document.getElementById("txtLowestBrakePadMeasurementFront")).value = "";
        (<HTMLInputElement>document.getElementById("txtLowestBrakePadMeasurementRear")).value = "";
        (<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedFront")).value = "";
        (<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedRear")).value = "";

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
    }

    calculateValues(): void {

        console.log("calculateValues");

        // calculate pctBrakePadMaterialRemainingFront which is txtLowestBrakePadMeasurementFront / 12
        let val: any = (<HTMLInputElement>document.getElementById("txtLowestBrakePadMeasurementFront")).value;
        if (this.isNumeric(val)) {
            const numericVal: number = +val;
            const percent: number = Math.round( numericVal / 12 * 100);
            document.getElementById("pctBrakePadMaterialRemainingFront").textContent = percent.toString();
        }

        // calculate pctBrakePadMaterialRemainingFront which is txtLowestBrakePadMeasurementFront / 12
        val = (<HTMLInputElement>document.getElementById("txtLowestBrakePadMeasurementRear")).value;
        if (this.isNumeric(val)) {
            const numericVal: number = +val;
            const percent: number = Math.round( numericVal / 12 * 100);
            document.getElementById("pctBrakePadMaterialRemainingRear").textContent = percent.toString();
        }

        let allValid: boolean = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedFront", "txtLowestBrakePadMeasurementFront"]);
        if (allValid) {
            const currentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const mileageWhenLastReplacedFront: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedFront")).value;
            const lowestBrakePadMeasurementFront: number = +(<HTMLInputElement>document.getElementById("txtLowestBrakePadMeasurementFront")).value;

            const result: number = ((currentMileage - mileageWhenLastReplacedFront) / ((12 - lowestBrakePadMeasurementFront)/12)) - (currentMileage - mileageWhenLastReplacedFront)
            document.getElementById("howManyMoreMilesUntil0Front").textContent = this.formatNumber(result);
        }

        allValid = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedRear", "txtLowestBrakePadMeasurementRear"]);
        if (allValid) {
            const currentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const mileageWhenLastReplacedRear: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedRear")).value;
            const lowestBrakePadMeasurementRear: number = +(<HTMLInputElement>document.getElementById("txtLowestBrakePadMeasurementRear")).value;

            const result: number = ((currentMileage - mileageWhenLastReplacedRear) / ((12 - lowestBrakePadMeasurementRear)/12)) - (currentMileage - mileageWhenLastReplacedRear)
            document.getElementById("howManyMoreMilesUntil0Rear").textContent = this.formatNumber(result);
        }       

        // approxLifeOfBrakePadsFront = currentMileage - txtMileageWhenLastReplacedFront + howManyMoreMilesUntil0Front
        allValid = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedFront", "howManyMoreMilesUntil0Front"]);
        if (allValid) {
            const currentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const mileageWhenLastReplacedFront: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedFront")).value;
            const howManyMoreMilesUntil0Rear: number = this.getLabelValue("howManyMoreMilesUntil0Front");

            const result = currentMileage - mileageWhenLastReplacedFront + howManyMoreMilesUntil0Rear;
            document.getElementById("approxLifeOfBrakePadsFront").textContent = this.formatNumber(result);
        }

        // approxLifeOfBrakePadsRear = currentMileage - txtMileageWhenLastReplacedRear + howManyMoreMilesUntil0Rear
        allValid = this.inputValid(["txtCurrentMileage", "txtMileageWhenLastReplacedRear", "howManyMoreMilesUntil0Rear"]);
        if (allValid) {
            const currentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const mileageWhenLastReplacedRear: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedRear")).value;
            const howManyMoreMilesUntil0Rear: number = this.getLabelValue("howManyMoreMilesUntil0Rear");

            const result = currentMileage - mileageWhenLastReplacedRear + howManyMoreMilesUntil0Rear;
            document.getElementById("approxLifeOfBrakePadsRear").textContent = this.formatNumber(result);
        }        


        // atWhatMileage0Front = howManyMoreMilesUntil0Rear + currentMileage
        allValid = this.inputValid(["txtCurrentMileage", "howManyMoreMilesUntil0Front"]);
        if (allValid) {
            const currentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const howManyMoreMilesUntil0Rear: number = this.getLabelValue("howManyMoreMilesUntil0Front");

            const result = currentMileage  + howManyMoreMilesUntil0Rear;
            document.getElementById("atWhatMileage0Front").textContent = this.formatNumber(result);
        }

        // atWhatMileage0Rear = howManyMoreMilesUntil0Rear + currentMileage
        allValid = this.inputValid(["txtCurrentMileage", "howManyMoreMilesUntil0Rear"]);
        if (allValid) {
            const currentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const howManyMoreMilesUntil0Rear: number = this.getLabelValue("howManyMoreMilesUntil0Rear");

            const result = currentMileage  + howManyMoreMilesUntil0Rear;
            document.getElementById("atWhatMileage0Rear").textContent = this.formatNumber(result);
        }

        // 10% row

        // atWhatMileage10Front = approxLifeOfBrakePadsFront * 0.9 + txtMileageWhenLastReplacedFront
        allValid = this.inputValid(["approxLifeOfBrakePadsFront", "txtMileageWhenLastReplacedFront"]);
        if (allValid) {
            const txtMileageWhenLastReplacedFront: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedFront")).value;
            const approxLifeOfBrakePadsFront: number = this.getLabelValue("approxLifeOfBrakePadsFront");

            const result = approxLifeOfBrakePadsFront * 0.9 + txtMileageWhenLastReplacedFront;
            document.getElementById("atWhatMileage10Front").textContent = this.formatNumber(result);
        }

        // atWhatMileage10Rear = approxLifeOfBrakePadsRear * 0.9 + txtMileageWhenLastReplacedRear
        allValid = this.inputValid(["approxLifeOfBrakePadsRear", "txtMileageWhenLastReplacedRear"]);
        if (allValid) {
            const txtMileageWhenLastReplacedRear: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedRear")).value;
            const approxLifeOfBrakePadsRear: number = this.getLabelValue("approxLifeOfBrakePadsRear");

            const result = approxLifeOfBrakePadsRear * 0.9 + txtMileageWhenLastReplacedRear;
            document.getElementById("atWhatMileage10Rear").textContent = this.formatNumber(result);
        }        

        // howManyMoreMilesUntil10Front = atWhatMileage10Front - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage10Front", "txtCurrentMileage"]);
        if (allValid) {
            const txtCurrentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const atWhatMileage10Front: number = this.getLabelValue("atWhatMileage10Front");

            const result = atWhatMileage10Front  - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil10Front").textContent = this.formatNumber(result);
        }

        // howManyMoreMilesUntil10Rear = atWhatMileage10Rear - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage10Rear", "txtCurrentMileage"]);
        if (allValid) {
            const txtCurrentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const atWhatMileage10Rear: number = this.getLabelValue("atWhatMileage10Rear");

            const result = atWhatMileage10Rear  - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil10Rear").textContent = this.formatNumber(result);
        }        


        // 20% row
        // atWhatMileage20Front = approxLifeOfBrakePadsFront * 0.8 + txtMileageWhenLastReplacedFront
        allValid = this.inputValid(["approxLifeOfBrakePadsFront", "txtMileageWhenLastReplacedFront"]);
        if (allValid) {
            const txtMileageWhenLastReplacedFront: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedFront")).value;
            const approxLifeOfBrakePadsFront: number = this.getLabelValue("approxLifeOfBrakePadsFront");

            const result = approxLifeOfBrakePadsFront * 0.8 + txtMileageWhenLastReplacedFront;
            document.getElementById("atWhatMileage20Front").textContent = this.formatNumber(result);
        }

        // atWhatMileage20Rear = approxLifeOfBrakePadsRear * 0.8 + txtMileageWhenLastReplacedRear
        allValid = this.inputValid(["approxLifeOfBrakePadsRear", "txtMileageWhenLastReplacedRear"]);
        if (allValid) {
            const txtMileageWhenLastReplacedRear: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedRear")).value;
            const approxLifeOfBrakePadsRear: number = this.getLabelValue("approxLifeOfBrakePadsRear");

            const result = approxLifeOfBrakePadsRear * 0.8 + txtMileageWhenLastReplacedRear;
            document.getElementById("atWhatMileage20Rear").textContent = this.formatNumber(result);
        }        

        // howManyMoreMilesUntil20Front = atWhatMileage20Front - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage20Front", "txtCurrentMileage"]);
        if (allValid) {
            const txtCurrentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const atWhatMileage20Front: number = this.getLabelValue("atWhatMileage20Front");

            const result = atWhatMileage20Front  - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil20Front").textContent = this.formatNumber(result);
        }

        // howManyMoreMilesUntil20Rear = atWhatMileage20Rear - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage20Rear", "txtCurrentMileage"]);
        if (allValid) {
            const txtCurrentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const atWhatMileage20Rear: number = this.getLabelValue("atWhatMileage20Rear");

            const result = atWhatMileage20Rear  - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil20Rear").textContent = this.formatNumber(result);
        }                


        // 30% row
        // atWhatMileage30Front = approxLifeOfBrakePadsFront * 0.7 + txtMileageWhenLastReplacedFront
        allValid = this.inputValid(["approxLifeOfBrakePadsFront", "txtMileageWhenLastReplacedFront"]);
        if (allValid) {
            const txtMileageWhenLastReplacedFront: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedFront")).value;
            const approxLifeOfBrakePadsFront: number = this.getLabelValue("approxLifeOfBrakePadsFront");

            const result = approxLifeOfBrakePadsFront * 0.7 + txtMileageWhenLastReplacedFront;
            document.getElementById("atWhatMileage30Front").textContent = this.formatNumber(result);
        }

        // atWhatMileage30Rear = approxLifeOfBrakePadsRear * 0.7 + txtMileageWhenLastReplacedRear
        allValid = this.inputValid(["approxLifeOfBrakePadsRear", "txtMileageWhenLastReplacedRear"]);
        if (allValid) {
            const txtMileageWhenLastReplacedRear: number = +(<HTMLInputElement>document.getElementById("txtMileageWhenLastReplacedRear")).value;
            const approxLifeOfBrakePadsRear: number = this.getLabelValue("approxLifeOfBrakePadsRear");

            const result = approxLifeOfBrakePadsRear * 0.7 + txtMileageWhenLastReplacedRear;
            document.getElementById("atWhatMileage30Rear").textContent = this.formatNumber(result);
        }        

        // howManyMoreMilesUntil30Front = atWhatMileage30Front - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage30Front", "txtCurrentMileage"]);
        if (allValid) {
            const txtCurrentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const atWhatMileage30Front: number = this.getLabelValue("atWhatMileage30Front");

            const result = atWhatMileage30Front  - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil30Front").textContent = this.formatNumber(result);
        }

        // howManyMoreMilesUntil30Rear = atWhatMileage30Rear - txtCurrentMileage
        allValid = this.inputValid(["atWhatMileage30Rear", "txtCurrentMileage"]);
        if (allValid) {
            const txtCurrentMileage: number = +(<HTMLInputElement>document.getElementById("txtCurrentMileage")).value;
            const atWhatMileage30Rear: number = this.getLabelValue("atWhatMileage30Rear");

            const result = atWhatMileage30Rear  - txtCurrentMileage;
            document.getElementById("howManyMoreMilesUntil30Rear").textContent = this.formatNumber(result);
        }                

    }


    inputValid(elements: string []): boolean {
        // check to see that input value is valid and numeric
        elements.forEach(element => {
            const val: any = (<HTMLInputElement>document.getElementById(element)).value;
            if (this.isNumeric(val) == false) return false;
        });

        return true;
    }

    labelValid(elements: string []) : boolean {
        // check to see that input value is valid and numeric
        elements.forEach(element => {
            const val: any = (<HTMLInputElement>document.getElementById(element)).value;
            if (this.isNumeric(val) == false) return false;
        });

        return true;        
    }

    isNumeric(num: any){
        return !isNaN(num)
    }

    formatNumber(x: number): string {
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getLabelValue(elementId: string): number {
        const textContent = document.getElementById(elementId).textContent;
        return parseInt(textContent.replace(/,/g, ''), 10);
    }
}

new BrakePadLifeCalc();
