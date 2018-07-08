import React from 'react';
import cn from 'classnames';
import { keys } from 'lodash-es';

function FieldsList({
    config,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
}) {
    return keys(config).map(field => {
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

export default FieldsList;
