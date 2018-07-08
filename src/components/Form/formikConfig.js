import { keys } from 'lodash-es';

export default function(config) {
    return {
        mapPropsToValues: props =>
            keys(config).reduce((acc, current) => {
                acc[current] = '';
                return acc;
            }, {}),
        // Add a custom validation function (this can be async too!)
        validate: values => {
            return keys(config).reduce((acc, current) => {
                const { regExp, wrong } = config[current].required;
                if (!values[current]) {
                    acc[current] = 'Field required';
                } else if (!new RegExp(regExp, 'i').test(values[current])) {
                    acc[current] = wrong;
                }
                return acc;
            }, {});
        },
    };
}
