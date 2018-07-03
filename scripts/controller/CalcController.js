class CalcController{

    constructor(){

        this._operation = [];
        this._locale = "pt-br";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonEvents();
    }

    initialize(){

        this.setDisplayDateTime();
        
        setInterval(()=>{

            this.setDisplayDateTime();
        }, 1000);
    }

    //Criando método "para cada" evento do mouse
    addEventListenerAll(element, events, fn){
        
        events.split(' ').forEach(event =>{
            
            element.addEventListener(event, fn, false);
        });

    }
    //Limpa qualquer dado no display da calculadora.
    clearAll(){
        this._operation = [];
    }
    //Deleta a última entrada.
    clearEntry(){
        this._operation.pop();
    }
    //Pega a última posição do array:
    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }
    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;
    }

    //Método que será utilizado para verificar se o último operador É DIFERENTE de número
    isOperator(value){
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1); 
    } 

    //Cria um array "para operações".
    addOperation(value){

        console.log('A', isNaN(this.getLastOperation()));
        
        if(isNaN(this.getLastOperation())){
            //Para quando for string. 
            if(this.isOperator(value)){
                
                this._setLastOperation(value);

            }else if(isNaN(value)) {
                
                console.log(value);
            }else{
                this._operation.push(value);
            }

        } else {
            //Para quando for número. 
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }
        console.log(this._operation);
    }
    //Default do Switch/Case.
    setError(){
        this.displayCalc = "Error";
    }
    //Switch case para botões/operações
    execBtn(value){

        switch(value){
            case 'ac':
                this.clearAll();
            break;

            case 'ce':
                this.clearEntry();
            break;

            case 'soma':
                this.addOperation('+');
            break;

            case 'subtracao':
                this.addOperation('-');
            break;

            case 'multiplicacao':
                this.addOperation('*');
            break;

            case 'divisao':
                this.addOperation('/');
            break;

            case 'porcento':
                this.addOperation('%');
            break;

            case 'igual':
                this.igual();
            break;

            case 'ponto':
                this.addOperation('.');
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break;


            default:
                this.setError();
            break;
        }
    }

    //Eventos do Mouse
    initButtonEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, 'click drag', e=>{
                let texBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(texBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e =>{

                btn.style.cursor = "pointer";
            });
        });
    }

    //Data e Hora na Calculadora
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"

        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    //Getters e Setters
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){

        this._displayCalcEl.innerHTML = value; 
    }
    get currentDate(){
        return new Date;
    }
    set currentDate(value){
        this._currentDate = value;
    }
}