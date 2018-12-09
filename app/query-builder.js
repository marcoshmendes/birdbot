const operators = require('../config/operators');

function set(params) {
    let query = '';

    if (!params['mention'] && !params['hashtag'] && !params['words'] && !params['from'] && !params['filter']
        && !params['except'] && !params['ask'] && !params['url'] && !params['or']) {
        return 'no_criteria_provided';
    }

    if (params['mention']) {
        query = operators.mentionSymbol + params['mention'];
    }

    if (params['hashtag']) {
        if (query) {
            query += operators.spaceSymbol;
        }

        query += operators.hashtagSymbol + params['hashtag'];
    }

    if (params['from']) {
        if (query) {
            query += operators.spaceSymbol;
        }

        query += operators.fromUserSymbol + params['from'];
    }

    if (params['filter']) {
        if (query) {
            query += operators.spaceSymbol;
        }

        query += operators.filterSymbol + params['filter'];
    }
    
    if (params['attitude'] && (params['hashtag'] || (params['words'] && Array.isArray(params['words'])))) {
        if (params['attitude'] === 'positive') {
            query += operators.spaceSymbol + operators.positiveAttitudeSymbol;
        }
        
        if (params['attitude'] === 'negative') {
            query += operators.spaceSymbol + operators.negativeAttitudeSymbol;
        }
    }

    if (params['except']) {
        query += operators.spaceSymbol + operators.exceptWordSymbol + params['except'];
    }

    if (params['ask']) {
        query += operators.spaceSymbol + operators.askQuestionSymbol;
    }

    if (params['or'] && !params['words']) {
        if (!params['or'].keys || !params['or'].type || !Array.isArray(params['or'].keys)
        || params['or'].keys.length !== 2) {
            return;
        }

        if (params['or'].type === 'word') {
            if (query) {
                query += operators.spaceSymbol;
            }

            query += params['or'].keys[0] + operators.spaceSymbol + operators.orSymbol + 
            operators.spaceSymbol + params['or'].keys[1];
        }

        if (params['or'].type === 'hashtag') {
            if (query) {
                query += operators.spaceSymbol;
            }
            
            query += operators.hashtagSymbol + params['or'].keys[0] + operators.spaceSymbol + 
            operators.orSymbol + operators.spaceSymbol + operators.hashtagSymbol + params['or'].keys[1];
        }
    }
    
    if (params['words'] && Array.isArray(params['words']) && !params['or']) {
        if (params['words'].length) {
            params['words'].forEach((word) => {
                query += operators.spaceSymbol + word;
            });
        }
    }

    if (params['url']) {
        if (query) {
            query += operators.spaceSymbol;
        }

        query += operators.urlSymbol + params['url'];
    }

    if (params['recent']) {
        query += operators.recentSymbol;
    }

    return query;
}

module.exports = {
    set: set
}