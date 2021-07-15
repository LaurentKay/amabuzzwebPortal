import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
const Home = (props) =>{
    //'Loan Constants
    const  Minimum_Loan = 500;
    const Maximum_Loan = 3000;
    const Default_Loan = 1700;
    const Default_Loan_Length_1 = false;
    const Default_Loan_Length_2 = true;
    const Default_Loan_Length_3 = false;
    const Interest_Rate_pm = 0.00;
    const Monthly_Fee = 60;
    const Initiation_Fee = 165;
    const VAT_Rate = 0.15;

    const CalculateInterest = (LoanAmount,NoOfInstalments) => {

        var InterestRate = document.getElementById('InterestRatePM').value;
        var CapitalInstalment = LoanAmount/NoOfInstalments;
        var TotalInterest = 0

        for (var i = 0; i < NoOfInstalments; i++) {

            var CurrentCapitalOutstanding = LoanAmount - (LoanAmount/NoOfInstalments)*i;
            var TotalInterest = TotalInterest + (InterestRate * CurrentCapitalOutstanding);

        }

        return TotalInterest.toFixed(2);


    }

    const CalculateFees = (LoanAmount,NoOfInstalments) =>{

        var VATRate = Number(document.getElementById('VATRate').value);
        var InitiationFee = Number(document.getElementById('InitiationFee').value);
        var MonthlyFee = document.getElementById('MonthlyFee').value * NoOfInstalments;


        //Additional Initiation Fee is 10% of amount over R1000
        if (LoanAmount > 1000){
            var InitiationFee = InitiationFee + (LoanAmount - 1000) * 0.1
        }

        var TotalFees = (InitiationFee + MonthlyFee) * (1 + VATRate);

        return TotalFees.toFixed(2);


    }
    const dispatch = useDispatch();
    const  CalculatePaymentVariables = (LoanAmount=0) => {
        var LoanAmount;
        if ( !isNaN(LoanAmount)){
            LoanAmount = document.getElementById('LoanAmount').value;
        }else{
            console.log('The amt: ', LoanAmount.target.value);
            LoanAmount = document.getElementById('LoanAmount').value;
        }
        var LoanLength=0;// = event.target.value;
        if(document.getElementById('loan-length1').checked){
            LoanLength = document.getElementById('loan-length1').value;
            // alert(LoanLength);
        }
        if(document.getElementById('loan-length2').checked){
            LoanLength = document.getElementById('loan-length2').value;
            //alert(LoanLength);
        }
        if(document.getElementById('loan-length3').checked){
            LoanLength = document.getElementById('loan-length3').value;
            //alert(LoanLength);
        }
        //alert(LoanLength);
        //alert(event.target.value + ' ');
        //var LoanLength = document.querySelector('input[id = loan-length]:checked').value;

        //Interest Calcs
        var Interest = CalculateInterest(LoanAmount,LoanLength)
        document.getElementById('Interest').innerHTML = Interest;

        var OneInstalment_Interest = CalculateInterest(LoanAmount,1)
        var TwoInstalment_Interest = CalculateInterest(LoanAmount,2)
        var ThreeInstalment_Interest = CalculateInterest(LoanAmount,3)

        //Fees Calcs
        var Fees = CalculateFees(LoanAmount,LoanLength)
        document.getElementById('Fees').innerHTML = Fees

           var OneInstalment_Fees = CalculateFees(LoanAmount,1)
        var TwoInstalment_Fees = CalculateFees(LoanAmount,2)
        var ThreeInstalment_Fees = CalculateFees(LoanAmount,3)

        //Total Repayments
        var TotalRepayment = Number(LoanAmount) + Number(Interest) + Number(Fees);
        document.getElementById('TotalRepayment').innerHTML = TotalRepayment.toFixed(2);

        var OneInstalment_TotalRepayment = Number(LoanAmount) + Number(OneInstalment_Interest) + Number(OneInstalment_Fees);
        var TwoInstalment_TotalRepayment = Number(LoanAmount) + Number(TwoInstalment_Interest) + Number(TwoInstalment_Fees);
        var ThreeInstalment_TotalRepayment = Number(LoanAmount) + Number(ThreeInstalment_Interest) + Number(ThreeInstalment_Fees);

        //Instalment
        var OneInstalment_Instalment = OneInstalment_TotalRepayment / 1;
        document.getElementById('OneInstalment_Instalment').innerHTML = Math.floor(OneInstalment_Instalment);

        var TwoInstalment_Instalment = TwoInstalment_TotalRepayment / 2;
        document.getElementById('TwoInstalment_Instalment').innerHTML = Math.floor(TwoInstalment_Instalment);

        var ThreeInstalment_Instalment = ThreeInstalment_TotalRepayment / 3;
        document.getElementById('ThreeInstalment_Instalment').innerHTML = Math.floor(ThreeInstalment_Instalment);
        var installMent = LoanLength === '1' ? OneInstalment_Instalment : LoanLength === '2' ? TwoInstalment_Instalment : ThreeInstalment_Instalment;
        const loanParams = [{loan1:LoanAmount, loanTerms:LoanLength, installMent,}];
        dispatch({type:'SAVE_LOAN_PARAMS', payload:loanParams});

    }

    useEffect(()=>{
      CalculatePaymentVariables( Default_Loan);
      document.getElementById('LoanAmount').addEventListener('loanValue', (e) => {
        CalculatePaymentVariables(Math.floor(e.target.value));
      })
    },[Default_Loan]);
    return (
        <>
        <section id="hero" className="d-flex justify-content-center align-items-center">
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-lg-6 container position-relative d-none d-lg-block" data-aos="zoom-in" data-aos-delay="100">
                        <h1>NEED HONEY,</h1>
                        <h1>NO MONEY?</h1>
                        <h2>Apply online and get approved in minutes.</h2>
                        <h4>You will need to have:</h4>
                        <div className="row">
                            <div className="col-lg-6">
                                <ul>
                                    <li><i className="icofont-check-circled"></i> a valid mobile number</li>
                                    <li><i className="icofont-check-circled"></i> a valid email address</li>
                                    <li><i className="icofont-check-circled"></i> verifiable income for the last 3 months</li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul>
                                    <li><i className="icofont-check-circled"></i> a bank account</li>
                                    <li><i className="icofont-check-circled"></i> an SA ID number</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-6 loan-calculator" align="center" data-aos="zoom-in" data-aos-delay="100">
                        {/* <%IF Interest_Rate_pm * 1 = 0 THEN%> */}
                        <span className="advanced">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0% Interest!</span>
                        {/* <%END IF%> */}
                        <h1 className="d-block d-lg-none d-xl-none">NEED HONEY,<br/>NO MONEY?</h1>
                        <h2>How much do you need to borrow?</h2>
                        <h1><output></output></h1>

                        <div className="row">
                            <div className="col text-white" align="left">R {Minimum_Loan}</div>
                            <div className="col text-white" align="right">R {Maximum_Loan}</div>
                        </div>
                        <input type="hidden" name="LoanAmount" id="LoanAmount" value={Default_Loan}/>
                        <input type="hidden" id="InterestRatePM" value={Interest_Rate_pm}/>
                        <input type="hidden" id="MonthlyFee" value={Monthly_Fee}/>
                        <input type="hidden" id="InitiationFee" value={Initiation_Fee}/>
                        <input type="hidden" id="VATRate" value={VAT_Rate}/>

                        <input type="range" value={Default_Loan} min={Minimum_Loan} max={Maximum_Loan} step="50" data-orientation="horizontal" data-rangeslider/>


                        <br/>
                        <div className="row">
                            <div className="col" align="center">
                                <h3>Choose your loan length</h3>
                                <div className="btn-group btn-group-toggle w-100" data-toggle="buttons"  >
                                    <label className="btn btn-loan-length-1">
                                        <input type="radio" name="loan-length" id="loan-length1" value="1" onClick={CalculatePaymentVariables} autocomplete="off" checked={Default_Loan_Length_1}/> <i className="bx bx-check-circle bx-sm white checked"></i><i className="bx bx-circle white unchecked"></i><span className="loan-length-font">&nbsp;1 month&nbsp;</span><br/><span className="instalment-font">R<a id="OneInstalment_Instalment"></a>pm</span>
                                    </label>
                                    <label className="btn btn-loan-length-1 active">
                                        <input type="radio" name="loan-length" id="loan-length2" value="2" onClick={CalculatePaymentVariables} autocomplete="off" checked={Default_Loan_Length_2} /> <i className="bx bx-check-circle bx-sm white checked"></i><i className="bx bx-circle white unchecked"></i><span className="loan-length-font">&nbsp;2 months</span><br/><span className="instalment-font">R<a id="TwoInstalment_Instalment"></a>pm</span>
                                    </label>
                                    <label className="btn btn-loan-length-1">
                                        <input type="radio" name="loan-length" id="loan-length3" value="3" onClick={CalculatePaymentVariables} autocomplete="off" checked={Default_Loan_Length_3}/> <i className="bx bx-check-circle bx-sm white checked"></i><i className="bx bx-circle white unchecked"></i><span className="loan-length-font">&nbsp;3 months</span><br/><span className="instalment-font">R<a id="ThreeInstalment_Instalment"></a>pm</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row loan-details">
                            <div className="col-4" align="center">
                                Interest<br/>R<a id="Interest"></a>
                            </div>
                            <div className="col-3" align="center">
                                Fees<br/>R<a id="Fees"></a>
                            </div>
                            <div className="col-5" align="center">
                                Total repayment<br/>R<a id="TotalRepayment"></a>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                <Link to="/login" className="btn-apply-now">APPLY NOW!</Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col loan-disclaimer">
                                The above example is illustrative only and includes interest at ROUND(Interest_Rate_pm*100, 2)% pm, an initial fee of R165 plus 10% of the amount over R1000, and monthly fees of R60pm pro-rated for the first month, plus VAT_Rate*100% VAT on the fees.
                                The example is also based on the assumption that repayments are made on time as per the original loan contract terms otherwise other fees and charges are payable.

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <main id="main">

        <section id="covid19" className="covid19">
        <div className="container" data-aos="fade-up">
                <a href="https://sacoronavirus.co.za" target="_blank" className="more-btn"><b>COVID-19</b>. Visit the SA Corona Virus portal for COVID-19 updates!</a>
        </div>
        </section>

        <section id="whatyouneed" className="d-flex justify-content-center align-items-center d-block d-lg-none d-xl-none">
        <div className="container" data-aos="fade-up">

                <h1>Apply online and get approved in minutes.</h1>
            <h2>You will need to have:</h2>
                <ul>
                    <li><i className="icofont-check-circled"></i> a valid mobile number</li>
                    <li><i className="icofont-check-circled"></i> a valid email address</li>
                    <li><i className="icofont-check-circled"></i> verifiable income for the last 3 months</li>
                    <li><i className="icofont-check-circled"></i> a bank account</li>
                    <li><i className="icofont-check-circled"></i> an SA ID number</li>
                </ul>


        </div>
        </section>

        <section id="why-us" className="why-us">
        <div className="container" data-aos="fade-up">

            <div className="row">
            <div className="col-lg-4 d-flex align-items-stretch">
                <div className="content">
                <h3>How it works?</h3>
                <p>
                    Almost anybody with a steady income can apply for a loan. You can submit your application online 24 hours, 7 days a week.
                    Once approved, we will instantly transfer your funds. It's in our DNA to make it happen!
                </p>
                <div className="text-center">
                    <a href="about.html" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
                </div>
                </div>
            </div>
            <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="row">
                    <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-receipt"></i>
                        <h4>1. Effortless Application</h4>
                        <p>Our loan application takes about 5 minutes to complete. We have made the process simple and effortless.</p>
                    </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-cube-alt"></i>
                        <h4>2. Fast Processing</h4>
                        <p>Once submitted, your application will be assessed and vetted. We may ask you for some additional documents.</p>
                    </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-money"></i>
                        <h4>3. Money Honey, Money!</h4>
                        <p>Upon approval of your application and your Debicheck debit order, your money will be transferred. Happy Shopping!</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
        </section>

        <section id="counts" className="counts section-bg">
        <div className="container">

            <div className="row counters">

            <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">{Maximum_Loan}</span>
                <p>Max 1st loan</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">6000</span>
                <p>Max 2nd loan</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">{(Interest_Rate_pm*100).toFixed(2)}</span>
                <p>% Interest Rate pm</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">3</span>
                <p>Months to pay</p>
            </div>

            </div>

        </div>
        </section>

        <section id="about" className="about">
        <div className="container" data-aos="fade-up">

            <div className="section-title">
            <h2>About</h2>
            <p>About Us</p>
            </div>

            <div className="row">
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                <img src="assets/img/boardroom.jpg" className="img-fluid" alt=""/>
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                <p className="font-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
                </p>
                <ul>
                <li><i className="icofont-check-circled"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                <li><i className="icofont-check-circled"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                <li><i className="icofont-check-circled"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                </ul>
                <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                </p>
            </div>
            </div>

        </div>
        </section>

        <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">

            <div className="section-title">
            <h2>Contact</h2>
            <p>Contact Us</p>
            </div>

            <div className="row mt-5">

            <div className="col-lg-4">

                <div className="info">
                <div className="phone">
                    <i className="icofont-phone"></i>
                    <h4>Call:</h4>
                    <p>087 123 4567 (Mon-Fri 8am-5pm)</p>
                </div>

                <div className="email">
                    <i className="icofont-envelope"></i>
                    <h4>Email:</h4>
                    <p><a href="mailto:info@amabuzz.co.za">help@amabuzz.co.za</a></p>
                </div>

                <div className="whatsapp">
                    <i className="icofont-whatsapp"></i>
                    <h4>WhatsApp:</h4>
                    <p><a href="https://wa.me/1XXXXXXXXXX?text=Hi">082 000 0000&nbsp;&nbsp;(Click to WhatsApp us)</a></p>
                </div>

                <div className="address">
                    <i className="icofont-google-map"></i>
                    <h4>Location:</h4>
                    <p>1st Floor, 39 Somerset Road, Green Point, Cape Town</p>
                </div>

                </div>

            </div>

            <div className="col-lg-8 mt-5 mt-lg-0">

                <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                <div className="form-row">
                    <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                    <div className="validate"></div>
                    </div>
                    <div className="col-md-6 form-group">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                    <div className="validate"></div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                    <div className="validate"></div>
                </div>
                <div className="form-group">
                    <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                    <div className="validate"></div>
                </div>
                <div className="mb-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center"><button type="submit">Send Message</button></div>
                </form>

            </div>

            </div>

        </div>
        </section>

        </main>
    </>
    );
};

export default Home;
