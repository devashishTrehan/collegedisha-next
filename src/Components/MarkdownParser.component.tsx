import { AppSectionHeights, Theme } from '@/Services/App.service';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';
import { NavbarContext } from '@/Context/Navbar.context';

const useStyles = makeStyles({
    markdownContainer: (props: { navHeight: number }) => {
        return {
            fontFamily: 'gordita',
            textAlign: 'left',
            color: Theme.fontColorSecondary,
            // overflow: 'scroll',
            '& *': {
                clear: 'both',
            },
            '& table': {
                borderCollapse: 'collapse',
                width: '100%',
                margin: '10px 0px',
                '& thead': {
                    '& th': {
                        position: 'sticky',
                        top: props.navHeight + AppSectionHeights.pageNavigation,
                        zIndex: 5,
                        // '&:first-child': {
                        //     left: 0,
                        // },
                    }
                },
                '& th': {
                    paddingTop: 12,
                    paddingBottom: 12,
                    backgroundColor: Theme.fontColorSecondary,
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
                    // '& td:first-child': {
                    //     position: 'sticky',
                    //     left: 0,
                    // },
                    '&:nth-child(even)': {
                        backgroundColor: '#f6f6f6',
                    },
                }
            },
            '& h4,h3,h2': {
                padding: '10px 0',
                color: Theme.primary,
                fontSize: 18,
            },
            '& h6,h5': {
                padding: '10px 0',
                color: Theme.primary,
                fontSize: 16,
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
            .map((line: string) => line.trim())
            .join("\n")

        return result
    } catch (_error) {
        console.log('indent error', _error);
        return content;
    }
}

interface Props {
    content: string,
}

function MarkdownParser(props: Props) {

    const { navHeight } = useContext(NavbarContext);
    const styles = useStyles({ navHeight: navHeight });

    const isMobile = useMediaQuery('(max-width:769px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    // useEffect(() => {
    //     setContent(stripIndent(props.children));
    // }, [])


    return (
        <div className={classNames(styles.markdownContainer, { [styles.markdownContainer_M]: isMobile })}>

            <ReactMarkdown plugins={[remarkGfm]} children={stripIndent(props.content)} escapeHtml={false} />

        </div>
    );
}

export default MarkdownParser;