import { Theme } from '@/Services/App.service';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';

const useStyles = makeStyles({
    markdownContainer: {
        fontFamily: 'gordita',
        textAlign: 'left',
        color: Theme.fontColorSecondary,
        '& *': {
            clear: 'both',
        },
        '& table': {
            borderCollapse: 'collapse',
            width: '100%',
            marginBottom: 10,
            '& th': {
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: Theme.primary,
                color: '#fff',
                fontSize: 15,
            },
            '& td,th': {
                border: '1px solid #eee',
                padding: Theme.spacingLess,
            },
            '& tr': {
                transition: '.2s',
                fontSize: 14,
                '&:nth-child(even)': {
                    backgroundColor: '#f6f6f6',
                },
                // '&:hover': {
                //     backgroundColor: '#eee',
                // }
            }
        },
        '& h4,h3,h2': {
            padding: '10px 0 5px',
            color: Theme.primary,
            fontSize: 20,
        },
        '& h6,h5': {
            padding: '10px 0 5px',
            color: Theme.primary,
            fontSize: 18,
        },
        '& hr': {
            height: '1px',
            backgroundColor: '#ccc',
            border: 'none',
            margin: '20px 0',
        },
        '& p': {
            lineHeight: '28px',
            marginTop: 10,
            fontSize: 15,
        },
        '& ul': {
            paddingLeft: 20,
            marginTop: 10,
            marginBottom: 20,
            '& li': {
                '&::marker': {
                    fontSize: 18,
                },
                lineHeight: '28px',
                fontSize: 14,
            }
        },
        '& ol': {
            paddingLeft: 20,
            marginTop: 10,
            marginBottom: 20,
            '& li': {
                '&::marker': {
                    fontSize: 14,
                },
                lineHeight: '28px',
                fontSize: 14,
            }
        }
    },
    markdownContainer_M: {
        '& table': {
            '& th': {
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 14,
            },
            '& td,th': {
                padding: 8,
            },
            '& tr': {
                fontSize: 12,
            }
        },
        '& h4,h3,h2': {
            fontSize: 18,
        },
        '& h6,h5': {
            fontSize: 16,
        },
        '& hr': {
            margin: '10px 0',
        },
        '& p': {
            lineHeight: '24px',
            fontSize: 16,
        },
        '& ul': {
            '& li': {
                '&::marker': {
                    fontSize: 16,
                },
                lineHeight: '24px',
                fontSize: 12,
            }
        },
        '& ol': {
            '& li': {
                '&::marker': {
                    fontSize: 16,
                },
                lineHeight: '24px',
                fontSize: 12,
            }
        }
    }
})

const stripIndent = (content: string) => {
    try {
        const lines = content.split("\n")

        const firstContentfulLine = lines[0].trim() ? lines[0] : lines[1]

        const indent = firstContentfulLine.match(/^\s*/)[0].length

        const result = lines
            .map((line: string) => line.slice(indent))
            .join("\n")
            .trim()
        console.log('indent result', result);
        return result
    } catch (_error) {
        console.log('indent error', _error);
        return content;
    }
}

interface Props {
    children: string,
}

function MarkdownParser(props: Props) {

    const styles = useStyles();
    const [content, setContent] = useState(props.children);

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    // useEffect(() => {
    //     setContent(stripIndent(props.children));
    // }, [])


    return (
        <div className={classNames(styles.markdownContainer, { [styles.markdownContainer_M]: isMobile })}>

            <ReactMarkdown plugins={[remarkGfm]} children={content} escapeHtml={true} />

        </div>
    );
}

export default MarkdownParser;