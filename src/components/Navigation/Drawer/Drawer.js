import React, {Component, Fragment} from "react";
import {NavLink} from "react-router-dom";
import classes from './Drawer.module.scss';
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
  renderLinks(links) {
    return links.map((link, i) => {
      return (
        <li key={i}>
          <NavLink
            to={link.to} exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }
  render() {
    const {isOpen, onClose} = this.props;

    const cls = [classes.Drawer];

    if (!isOpen) {
      cls.push(classes.close)
    }

    const links = [
      { to: '/', label: 'Список',  exact: true },
    ];

    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Создать тест',  exact: false })
      links.push({ to: '/logout', label: 'Выйти',  exact: false })
    } else {
      links.push({ to: '/auth', label: 'Авторизация',  exact: false })
    }

    return (
      <Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
          </ul>
        </nav>
        { isOpen && <Backdrop onClick={onClose}/>}

      </Fragment>
    )
  }
}

export default Drawer;
