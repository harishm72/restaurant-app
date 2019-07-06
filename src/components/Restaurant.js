import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'

import { bookTableView } from '../store/actions'

const styles = theme => ({

  card: {
    maxWidth: 400,
  },
  bookTable : {
    color: 'white',
    backgroundColor: 'black'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Restaurant extends React.Component {

  handleClick = (event) => {
    this.props.bookTableView(this.props.email.email, this.props.rest)
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
         <NavLink to={{pathname: `/restaurants?book`}}>
        <div onClick={this.handleClick}>
        <CardMedia
          className={classes.media}
          image={this.props.rest.featured_image}
          src="./fallback.jpeg"
        />
        </div>
        </NavLink>
         <CardHeader style={{padding: '0 16px'}}
          title={this.props.rest.name}
        />
        <CardContent style={{padding : '8px 16px'}}>
          <Typography component="p">
            {this.props.rest.cuisines}
            </Typography>
          <Typography paragraph className="rest-locality" style={{margin: "0px"}}>
            {this.props.rest.location.locality} , {this.props.rest.location.city}
        </Typography>
        </CardContent>
        <div>
            <div className="card-bottom">
                <NavLink to={{pathname: `/restaurants?book`}}>
                        <button aria-label="book a table" className="book-table" onClick={this.handleClick}>
                        Book a table
                        </button>
                </NavLink>
                <p className="rest-rating" 
                    style={{backgroundColor : `#${this.props.rest.user_rating.rating_color}`}}>
                    {this.props.rest['user_rating']['aggregate_rating']}</p>
            </div>
            <form>

            </form>
        </div>
      </Card>
    );
  }
}

Restaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  email : state.userDetails.user
})
const mapDispatchToProps = dispatch => ({
  bookTableView : (email, rest) => dispatch(bookTableView(email, rest))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Restaurant));