import React from 'react';
import { Link } from 'react-router-dom';

function SignUpPage(params) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-md-4" />
                <div className="col-md-4 ">
                    <form className="form-signin">
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

                        <div className="form-label-group">
                            <input
                                type="text"
                                id="inputName"
                                className="form-control"
                                placeholder="Name"
                                required=""
                                autoFocus=""
                            />
                            <label htmlFor="inputName">Name</label>
                        </div>

                        <div className="form-label-group">
                            <input
                                type="email"
                                id="inputEmail"
                                className="form-control"
                                placeholder="Email address"
                                required=""
                                autoFocus=""
                            />
                            <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                            <input
                                type="password"
                                id="inputPassword"
                                className="form-control"
                                placeholder="Password"
                                required=""
                            />
                            <label htmlFor="inputPassword">Password</label>
                        </div>
                        <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <small class="text-muted">
                            Already have account?{' '}
                            <Link to="/login">Sign in</Link>
                        </small>
                        <p className="mt-5 mb-3 text-muted text-center">
                            © 2017-2018
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
