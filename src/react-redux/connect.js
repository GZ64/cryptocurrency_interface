import React from "react";
import PropTypes from "prop-types";

export default function(mapDispatchToProps, mapStateToProps) {

    return function(Component) {
        class ConnectedComponent extends React.Component {
            componentDidMount() {
                this.context.store.subscribe( () => this.forceUpdate());
            }
            render() {
                const {context, props} = this;
                const propsFromDispatch = mapDispatchToProps(context.store.dispatch);
                const propsFromState = mapStateToProps(context.store.getState());
                return (
                    <Component
                        {...props}
                        {...propsFromDispatch}
                        {...propsFromState}
                    />
                );
            }
        }

        ConnectedComponent.contextTypes = {
            store: PropTypes.object,
        };

        return ConnectedComponent;
    }
}