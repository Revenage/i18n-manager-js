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
    password: {
        placeholder: 'Password',
        type: 'password',
        required: {
            regExp: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
            wrong:
                'Password length must be at least 8. Password must contain at least 1 upper letter, 1 lower letter and 1 digit',
        },
        validFeedback: 'Looks good!',
        invalidFeedback: 'Invalid password',
    },
};

Object.defineProperty(config, 'keys', {
    get: function() {
        return Object.keys(config);
    },
    enumerable: false,
});

Object.defineProperty(config, 'initial', {
    get: function() {
        return Object.keys(config).reduce((acc, current) => {
            acc[current] = '';
            return acc;
        }, {});
    },
    enumerable: false,
});

function FieldsList({
    config,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
}) {
    return config.keys.map(field => {
        const { type, placeholder, required, validFeedback } = config[field];
        const id = `input${field}`;
        const isTouched = touched[field];
        const error = errors[field];
        return (
            <div className="form-label-group" key={field}>
                <input
                    type={type}
                    name={field}
                    onChange={handleChange}
                    onBlur={e => handleBlur(e)}
                    value={values[field]}
                    id={id}
                    className={cn('form-control', {
                        'is-invalid': isTouched && error,
                        'is-valid': isTouched && !error,
                    })}
                    placeholder={placeholder}
                    required={required}
                />
                <label htmlFor={id}>{placeholder}</label>
                {isTouched && (
                    <small
                        className={cn('form-text', {
                            'invalid-feedback': error,
                            'valid-feedback': !error,
                        })}
                    >
                        {error || validFeedback}
                    </small>
                )}
            </div>
        );
    });
}

function LoginPage({ handleSubmit, isSubmitting, ...formikProps }) {
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
                <FieldsList config={config} {...formikProps} />
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
    mapPropsToValues: props => config.initial,
    // Add a custom validation function (this can be async too!)
    validate: (values, props) => {
        return config.keys.reduce((acc, current) => {
            const { regExp, wrong } = config[current].required;
            if (!values[current]) {
                acc[current] = 'Field required';
            } else if (!new RegExp(regExp, 'i').test(values[current])) {
                acc[current] = wrong;
            }
            return acc;
        }, {});
    },
    // Submission handler
    handleSubmit: (values, { props, setSubmitting, setErrors }) => {
        unsecureInstance
            .post('/login/', values)
            .then(({ data }) => {
                const { key } = data;
                localStorage.setItem('token', key);
                setSubmitting(false);
            })
            .catch((err, a, b) => {
                const errors = Object.keys(values).reduce((acc, current) => {
                    acc[current] = 'bad';
                    return acc;
                }, {});
                setErrors(errors);
            });
    },
})(LoginPage);
