import React from 'react'
 
class ApplyDialoge extends React.Component{
    render() { 
        const { handleClose,  show,  children } = this.props;
        const showHideClassName = show ? "dialoge display-block" : "dialoge display-none";
      
        return (
          <div className={showHideClassName}>
            <section className="dialoge-main">
              {children}
              <button onClick={handleClose}>Send</button>
            </section>
          </div>
        );
      };
      
}

export default ApplyDialoge;