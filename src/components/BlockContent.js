import React, { Component } from 'react'
import { Grid, Typography, withStyles, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2)
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // eslint-disable-next-line no-useless-escape
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number'
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key'
            } else {
                cls = 'string'
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean'
        } else if (/null/.test(match)) {
            cls = 'null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
    })
}

const styles = theme => ({
    content: {
        width: 0,
        flex: '1 1 auto',
        height: '100%',
        wordBreak: 'break-word',
        padding: theme.spacing.unit * 2,
        overflow: 'scroll',
    },
    value: {
        fontFamily: 'Roboto Mono',
    },
    space: {
        height: theme.spacing.unit * 3,
    },
})

class BlockContent extends Component {
    render() {
        const { block, classes } = this.props
        if (!block) {
            return <Grid item></Grid>
        }

        var date = new Date(block.time * 1000)

        var payload = JSON.parse(atob(block.payload))
        if (!payload) {
            payload = block.payload
        } else {
            payload = syntaxHighlight(payload)
        }

        return (
            <Grid item className={classes.content}>
                <Typography variant="title">Block Detail</Typography>
                <div className={classes.space} />
                <Typography variant="overline">Time</Typography>
                <Typography variant="subtitle1" className={classes.value}>{date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}</Typography>
                <Divider />
                <div className={classes.space} />
                <Typography variant="overline">Block Hash</Typography>
                <Typography variant="subtitle1" className={classes.value}>{block.hash}</Typography>
                <Divider />
                <div className={classes.space} />
                <Typography variant="overline">Previous Hash</Typography>
                <Typography variant="subtitle1" className={classes.value}>{block.prev_hash.length === 0 ? '-' : block.prev_hash}</Typography>
                <Divider />
                <div className={classes.space} />
                <Typography variant="overline">Signature</Typography>
                <Typography variant="subtitle1" className={classes.value}>{block.signature}</Typography>
                <Divider />
                <div className={classes.space} />

                <Typography variant="overline">Payload</Typography>
                <Typography 
                    component="pre"
                    className={classes.value} 
                    dangerouslySetInnerHTML={{__html: payload}} 
                />

            </Grid>
        )
    }
}

BlockContent.propTypes = {
    block: PropTypes.object
}

export default withStyles(styles)(BlockContent)
