import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import Form, { FieldsList, formikConfig } from 'components/Form';
import { unsecureInstance } from 'api';
import { inject } from 'mobx-react';

const config = {
    username: {
        placeholder: 'Username',
        type: 'text',
        required: {
            regExp: '[a-zA-Z0-9_]{3,}$',
            wrong: 'Login length must be at least 3',
        },
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid username',
    },
    email: {
        placeholder: 'Email address',
        type: 'email',
        required: {
            regExp: '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$',
            wrong: 'Invalid email address',
        },
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid email address',
    },
    password1: {
        placeholder: 'Password',
        type: 'password',
        required: {
            regExp: '^(?=.*[a-z])(?=.*[0-9])(?=.{8,})', //'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            wrong:
                'Password length must be at least 8. Password must contain at least 1 upper letter, 1 lower letter and 1 digit',
        },
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid password',
    },
    password2: {
        placeholder: 'Password',
        type: 'password',
        required: {
            regExp: '^(?=.*[a-z])(?=.*[0-9])(?=.{8,})', //'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            wrong:
                'Password length must be at least 8. Password must contain at least 1 upper letter, 1 lower letter and 1 digit',
        },
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid password',
    },
};

function SignUpPage({ handleSubmit, isSubmitting, ...formikProps }) {
    return (
        <Form>
            <form className="form-signin" onSubmit={handleSubmit} noValidate>
                <div className="text-center mb-4">
                    <img
                        className="mb-4"
                        src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg"
                        alt=""
                        width="72"
                        height="72"
                    />
                    <h1 className="h3 mb-3 font-weight-normal">
                        Floating labels
                    </h1>
                    <p>
                        Build form controls with floating labels via the{' '}
                        <code>:placeholder-shown</code> pseudo-element.{' '}
                        <a href="https://caniuse.com/#feat=css-placeholder-shown">
                            Works in latest Chrome, Safari, and Firefox.
                        </a>
                    </p>
                </div>

                <FieldsList config={config} {...formikProps} />

                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                >
                    Sign Up
                </button>
                <small className="text-muted">
                    Already have account? <Link to="/login">Sign in</Link>
                </small>
                <p className="mt-5 mb-3 text-muted text-center">© 2017-2018</p>
            </form>
        </Form>
    );
}

export default withRouter(
    inject('store')(
        withFormik({
            // Transform outer props into form values
            ...formikConfig(config),
            // Submission handler
            handleSubmit: (
                values,
                { props: { history, store }, setSubmitting, setErrors },
            ) => {
                // TODO: move to store method
                unsecureInstance
                    .post('/rest-auth/registration/', values)
                    .then(({ data }) => {
                        const { key } = data;
                        localStorage.setItem('token', key);
                        store.fetchUser();
                        setSubmitting(false);
                        history.push('/');
                    })
                    .catch(err => {
                        const errors = Object.keys(values).reduce(
                            (acc, current) => {
                                acc[current] = 'bad';
                                return acc;
                            },
                            {},
                        );
                        setErrors(errors);
                    });
            },
        })(SignUpPage),
    ),
);
