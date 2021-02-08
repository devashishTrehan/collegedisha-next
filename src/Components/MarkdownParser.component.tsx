import { AppSectionHeights, Theme } from '@/Services/App.service';
import { useMediaQuery, Theme as MuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';
import { NavbarContext } from '@/Context/Navbar.context';

const useStyles = makeStyles((theme: MuiTheme) => ({
    markdownContainer: (props: { navHeight: number }) => {
        return {
            fontFamily: 'gordita',
            textAlign: 'left',
            color: Theme.fontColorSecondary,
            '& *': {
                clear: 'both',
            },
            '& .tableWrapper': {
                maxWidth: '100%',
                overflow: 'auto',
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
                    backgroundColor: Theme.fontColorSecondary,
                    color: '#fff',
                    [theme.breakpoints.up('xs')]: {
                        paddingTop: 10,
                        paddingBottom: 10,
                        fontSize: 13,
                    },
                    [theme.breakpoints.up('sm')]: {
                        fontSize: 14,
                    },
                    [theme.breakpoints.up('md')]: {
                        paddingTop: 12,
                        paddingBottom: 12,
                        fontSize: 15,
                    }
                },
                '& td,th': {
                    border: '1px solid #eee',
                    [theme.breakpoints.up('xs')]: {
                        padding: 8,
                    },
                    [theme.breakpoints.up('md')]: {
                        padding: Theme.spacingLess,
                    }
                },
                '& tr': {
                    transition: '.2s',
                    [theme.breakpoints.up('xs')]: {
                        fontSize: 12,
                    },
                    [theme.breakpoints.up('sm')]: {
                        fontSize: 13,
                    },
                    [theme.breakpoints.up('md')]: {
                        fontSize: 14,
                    },
                    '&:nth-child(even)': {
                        backgroundColor: '#f6f6f6',
                    },
                }
            },
            '& h4,h3,h2': {
                padding: '10px 0',
                marginTop: 10,
                color: Theme.primary,
                [theme.breakpoints.up('xs')]: {
                    fontSize: 16,
                },
                [theme.breakpoints.up('sm')]: {
                    fontSize: 17,
                },
                [theme.breakpoints.up('md')]: {
                    fontSize: 18,
                },
            },
            '& h6,h5': {
                marginTop: 8,
                padding: '10px 0',
                color: Theme.primary,
                [theme.breakpoints.up('xs')]: {
                    fontSize: 15,
                },
                [theme.breakpoints.up('md')]: {
                    fontSize: 16,
                },
            },
            '& hr': {
                height: '1px',
                backgroundColor: '#ccc',
                border: 'none',
                [theme.breakpoints.up('xs')]: {
                    margin: '10px 0',
                },
                [theme.breakpoints.up('md')]: {
                    margin: '20px 0',
                },
            },
            '& p': {
                marginTop: 10,
                letterSpacing: 1,
                wordSpacing: 2,
                [theme.breakpoints.up('xs')]: {
                    lineHeight: '24px',
                    fontSize: 12,
                },
                [theme.breakpoints.up('sm')]: {
                    lineHeight: '26px',
                    fontSize: 13,
                },
                [theme.breakpoints.up('md')]: {
                    lineHeight: '28px',
                    fontSize: 14,
                }
            },
            '& ul,ol': {
                paddingLeft: 20,
                marginTop: 10,
                marginBottom: 20,
                '& li': {
                    [theme.breakpoints.up('xs')]: {
                        '&::marker': {
                            fontSize: 16,
                        },
                        lineHeight: '26px',
                        fontSize: 12,
                    },
                    [theme.breakpoints.up('sm')]: {
                        '&::marker': {
                            fontSize: 17,
                        },
                        lineHeight: '26px',
                        fontSize: 13,
                    },
                    [theme.breakpoints.up('md')]: {
                        '&::marker': {
                            fontSize: 18,
                        },
                        lineHeight: '28px',
                        fontSize: 14,
                    },
                }
            },
            '& ol': {
                '& li': {
                    [theme.breakpoints.up('xs')]: {
                        '&::marker': {
                            fontSize: 12,
                        },
                    },
                    [theme.breakpoints.up('sm')]: {
                        '&::marker': {
                            fontSize: 13,
                        },
                    },
                    [theme.breakpoints.up('md')]: {
                        '&::marker': {
                            fontSize: 14,
                        },
                    },
                }
            },
        }
    },
}))

const stripIndent = (content: string) => {
    try {
        const lines = content.split("\n")
        const firstContentfulLine = lines[0].trim() ? lines[0] : lines[1]

        // const indent = firstContentfulLine.match(/^\s*/)[0].length

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


    useEffect(() => {
        let tables = document.getElementById('_MarkDownContainer_').querySelectorAll('table');
        for (let i = 0; i < tables?.length; i++) {
            tables[i]?.parentElement?.classList?.add('tableWrapper');
        }
    }, [])


    return (
        <div id='_MarkDownContainer_' className={classNames(styles.markdownContainer)}>

            <ReactMarkdown plugins={[remarkGfm]} children={stripIndent(props.content)} escapeHtml={false} />

        </div>
    );
}

export default MarkdownParser;