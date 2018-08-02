import React, { Component } from 'react';
import StepWizard from 'react-step-wizard';

/* eslint react/prop-types: 0 */

/**
 * A basic demonstration of how to use the step wizard
 */
export default class Wizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {},
        };
    }

    updateForm = (key, value) => {
        const { form } = this.state;

        form[key] = value;
        this.setState({ form });
    }

    render() {
        return (
            <div className='container'>
                <h2>React Step Wizard</h2>

                <div className='jumbotron'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-6 offset-3'>
                            <StepWizard>
                                <First update={this.updateForm} />
                                <Second form={this.state.form} />
                                <Third />
                            </StepWizard>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */
const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
}) => (
    <div>
        <hr />
        { currentStep > 1 &&
            <button className='btn btn-default btn-block' onClick={previousStep}>Go Back</button>
        }
        { currentStep < totalSteps ?
            <button className='btn btn-primary btn-block' onClick={nextStep}>Continue</button>
            :
            <button className='btn btn-success btn-block' onClick={nextStep}>Finish</button>
        }
        <hr />
        <div style={{ fontSize: '21px', fontWeight: '200' }}>
            <h4>Other Functions</h4>
            <div>Current Step: {currentStep}</div>
            <div>Total Steps: {totalSteps}</div>
            <button className='btn btn-block btn-default' onClick={() => goToStep(2)}>Go to Step 2</button>
            <button className='btn btn-block btn-default' onClick={firstStep}>First Step</button>
            <button className='btn btn-block btn-default' onClick={lastStep}>Last Step</button>
        </div>
    </div>
);

/** Steps */

class First extends Component {
    update = (e) => {
        this.props.update(e.target.name, e.target.value);
    }

    render() {
        if (!this.props.isActive) return null;

        return (
            <div>
                <h3 className='text-center'>Welcome! Have a look around!</h3>

                <label>First Name</label>
                <input type='text' className='form-control' name='firstname' placeholder='First Name'
                    onChange={this.update} />
                <Stats {...this.props} />
            </div>
        );
    }
}

class Second extends Component {
    validate = () => {
        if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
            this.props.previousStep();
        }
    }

    render() {
        if (!this.props.isActive) return null;

        return (
            <div>
                { this.props.form.firstname && <h3>Hey {this.props.form.firstname}! 👋</h3> }
                I've added validation to the previous button.
                <Stats {...this.props} previousStep={this.validate} />
            </div>
        );
    }
}

class Third extends Component {
    submit = () => {
        alert('You did it! Yay!') // eslint-disable-line
    }

    render() {
        if (!this.props.isActive) return null;

        return (
            <div>
                <div className={'text-center'}>
                    <h2>This is the last step in this example!</h2>
                    <hr />
                    <h4>Do you love it? Star it! 🤩</h4>
                    <iframe
                        src="https://ghbtns.com/github-btn.html?user=jcmcneal&repo=react-step-wizard&type=star&count=true&size=large"
                        frameBorder="0" scrolling="0" width="160px" height="30px"
                    />
                </div>
                <Stats {...this.props} nextStep={this.submit.bind(this)} />
            </div>
        );
    }
}
