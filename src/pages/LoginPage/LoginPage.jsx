import React from 'react';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';
import Form from 'components/Form';
import { unsecureInstance } from 'api';
import { isEmpty } from 'lodash-es';
import cn from 'classnames';

const config = {
    username: {
        placeholder: 'Username',
        type: 'text',
        required: true,
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid username',
    },
    email: {
        placeholder: 'Email address',
        type: 'email',
        required: true,
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid email address',
    },
    password: {
        placeholder: 'Password',
        type: 'password',
        required: true,
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid password',
    },
};

function FieldsList({ values, errors, touched, handleChange, handleBlur }) {
    return Object.keys(config).map(field => {
        const { type, placeholder, required, validFeedback } = config[field];
        const id = `input${field}`;
        return (
            <div className="form-label-group" key={field}>
                <input
                    type={type}
                    name={field}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field]}
                    id={id}
                    className={cn('form-control', {
                        'is-invalid': touched[field] && errors[field],
                        'is-valid': touched[field] && !errors[field],
                    })}
                    placeholder={placeholder}
                    required={required}
                />
                <label htmlFor={id}>{placeholder}</label>
                {touched[field] && (
                    <small
                        className={cn('form-text', {
                            'invalid-feedback': errors[field],
                            'valid-feedback': !errors[field],
                        })}
                    >
                        {errors[field] ? errors[field] : validFeedback}
                    </small>
                )}
            </div>
        );
    });
}

function LoginPage({ handleSubmit, isSubmitting, ...formikProps }) {
    console.log(isSubmitting);

    return (
        <Form>
            <form
                className="form-signin"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
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
                <FieldsList {...formikProps} />
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                >
                    Sign in
                </button>
                <small className="text-muted">
                    Haven't account? <Link to="/signup">Sign up</Link>
                </small>
                <p className="mt-5 mb-3 text-muted text-center">© 2017-2018</p>
            </form>
        </Form>
    );
}

export default withFormik({
    // Transform outer props into form values
    mapPropsToValues: props => ({ email: '', password: '', username: '' }),
    // Add a custom validation function (this can be async too!)
    validate: (values, props) => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Field required';
        } else if (!/[a-zA-Z0-9_]{3,}$/i.test(values.username)) {
            errors.username = 'Login length must be at least 3';
        }

        if (!values.email) {
            errors.email = 'Field required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Field required';
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(
                values.password,
            )
        ) {
            errors.password =
                'Password length must be at least 8. Password must contain at least 1 upper letter, 1 lower letter and 1 digit';
        }

        return errors;
    },
    // Submission handler
    handleSubmit: (values, { props, setSubmitting, setErrors }) => {
        console.log('send login');
        unsecureInstance
            .post('/login/', values)
            .then(({ data }) => {
                const { key } = data;
                localStorage.setItem('token', key);
                setSubmitting(false);
            })
            .catch((err, a, b) => {
                setErrors({
                    email: 'bad',
                    password: 'bad',
                    username: 'bad',
                });
            });
        // LoginToMyApp(values).then(
        //     user => {
        //         setSubmitting(false);
        //         // do whatevs...
        //         // props.updateUser(user)
        //     },
        //     errors => {
        //         setSubmitting(false);
        //         // Maybe even transform your API's errors into the same shape as Formik's!
        //         setErrors(transformMyApiErrors(errors));
        //     },
        // );
    },
})(LoginPage);
