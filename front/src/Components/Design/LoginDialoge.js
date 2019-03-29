import React from 'react'
 
class LoginDialoge extends React.Component{
    render() { 
        const { hideDialoge, show,  children, closeDialoge } = this.props;
        const showHideClassName = show ? "dialoge display-block" : "dialoge display-none";
      
        return (
          <div className={showHideClassName}>
            <section className="dialoge-main">
              {children}
              <button onClick={hideDialoge}>Ok</button>
              <button onClick={closeDialoge}>Cancel</button>
            </section>
          </div>
        );
      };
      
}

export default LoginDialoge;