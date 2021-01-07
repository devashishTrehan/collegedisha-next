
import { Button, Card, CardActionArea, CardContent, CardMedia, Collapse, Grid, Hidden, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import classNames from 'classnames';
import { SearchForm } from '@/Components/Search.component';
import { CounsellingStyles, ContentCardStyles, HeaderStyles, FeatureSectionStyles } from '@/styles/Home.style';
import { AnimatedSection } from '@/Components/AnimatedView.component';
import { Theme } from '../Services/App.service';
import { CheckCircle, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, PhoneRounded } from '@material-ui/icons';
import Carousel from 'react-material-ui-carousel';
import { CounsellingForm } from '@/Components/Forms/CounsellingForm.page';
import { CounsellingFormParent } from '@/Components/Forms/CounsellingFormParent.page';
import Particles from 'react-particles-js';
import ParticlesConfig from '../particlesjs-config';
import { ViewportTracker } from '@/Components/ViewportTracker.component';
import { FormHead } from '@/Components/FormHead.component';

let pageContentRef: any = React.createRef();
let CounsellingSectionRef: any = React.createRef();



export const Header = () => {

    const styles = HeaderStyles();
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    const scrollTo = (ref: any) => {
        ref?.scrollIntoView({ behavior: 'smooth', block: 'start', });
    }


    return (
        <div className={classNames('container')}>

            <div className={classNames(styles.container, { [styles.containerTablet]: isTablet, [styles.containerMobile]: isMobile })}>

                <Particles className={styles.particleSystem} params={ParticlesConfig} />

                <Grid container className={styles.HeadWrapper} spacing={6} >
                    <Grid item className={styles.headLeftContainer} xs={12} md={7}>

                        <div className={classNames(styles.HeadContainer, { [styles.HeadContainer_S]: isMobile })} >
                            <Typography variant='h3' >Find Top <span>
                                Colleges,
                                <br />
                                Coaching, Courses..!
                            </span></Typography>

                        </div>

                        <SearchForm />

                    </Grid>

                    <Grid item xs={12} md={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <AnimatedSection animationClass='shiftLeft' id='card' className={styles.CounsellingCard} style={{ margin: isTablet ? 'auto' : 'unset' }} >
                            <>
                                <div className="imgWrap">
                                    <img src='/assets/images/counsellingCard.png' alt='' />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography style={{ fontSize: 16 }}>Go for the Counselling</Typography>

                                    <AnimatedSection animationClass='beat' id='counselling-button'>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            style={{ fontSize: 10, textTransform: 'capitalize' }}
                                            onClick={() => scrollTo(CounsellingSectionRef)}>Click Here</Button>
                                    </AnimatedSection>

                                </div>
                            </>
                        </AnimatedSection>
                    </Grid>

                </Grid>


                <div className={classNames(styles.downButton)} onClick={() => scrollTo(pageContentRef)}>
                    <KeyboardArrowDown />
                </div>
            </div>
        </div>
    )

}


export const ContentCards = () => {

    const [carouselIndex, setCarouselIndex] = React.useState(0);
    let StepsCarouselIntervalRef: any = null;
    const StepsCarouselInterval = 10;   // time in seconds
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');


    interface stepItem {
        step: string[],
        title: string,
        description: string
    }

    const Steps = [
        {
            step: [
                'Sign Up for free quickly',
                'Post your updated resume',
            ],
            title: 'title',
            description: 'description'
        },
        {
            step: [
                'Sign Up for free quickly',
                'Post your updated resume',
            ],
            title: 'title 2',
            description: 'description 2'
        },
        {
            step: [
                'Sign Up for free quickly',
                'Post your updated resume',
            ],
            title: 'title 3',
            description: 'description 3'
        },
    ]


    const styles = ContentCardStyles();

    let CarouselRef = React.useRef();

    const slideCaousel = (direction: 'next' | 'prev') => {
        console.log('playing...');
        switch (direction) {
            case 'next': setCarouselIndex((prev: number) => {
                if (prev < Steps.length - 1) {
                    let next = ++prev;
                    return next;
                } else {
                    return 0;
                }
            })
                return;
            case 'prev': setCarouselIndex((prev: number) => {
                if (prev < 1) {
                    return Steps?.length - 1;
                } else {
                    return --prev;
                }
            })
                return;
        }


    }

    const SlideCarouselTo = (index: number) => {
        setCarouselIndex(index);
        return 0;
    }


    const renderStep = (item: stepItem, index: number) => {
        return (
            <React.Fragment key={index}>

                <AnimatedSection id={'stepCard'} animationClass='shiftUp'>
                    <div className='stepCard' onClick={() => SlideCarouselTo(index)} >
                        <div className='imageWrap' >
                            <img src={`/assets/images/stepCard${index + 1}.png`} alt='' style={index === carouselIndex ? {
                                transform: 'scale(1.05)',
                                border: `1px solid ${Theme.secondary}aa`,
                            } : {}} />
                        </div>
                        <div className='infoWrap' >
                            <h5>Step {index + 1}</h5>
                            {
                                item?.step?.map((info: string, index: number) => {
                                    return (<p key={index}>
                                        <span ><CheckCircle /></span>
                                        <span >{info}</span>
                                    </p>)
                                })
                            }
                        </div>
                        <div className='iconWrap'>
                            <span style={index === carouselIndex ? {
                                transform: 'translateX(25px) scale(1.3)',
                                background: Theme.secondary + 'aa',
                                color: '#fff',
                            } : {}}>
                                <KeyboardArrowRight />
                            </span>
                        </div>
                    </div >
                </AnimatedSection>
            </React.Fragment>

        )
    }

    const renderCarouselItem = (item: stepItem, index: number) => {
        const { title, description } = item;
        return (
            <div key={index} className='carouselCard'>
                <div className='imageWrap'>
                    <img src={`/assets/images/stepPoint${1}.png`} alt='' />
                </div>
                <div className='infoWrap' >
                    <h5>{title}</h5>
                    <p>{description}</p>
                </div>
            </div>
        )
    }

    const PlayCarouselSlide = () => {
        console.log('entered');
        StepsCarouselIntervalRef = setInterval(() => {
            slideCaousel('next');
        }, StepsCarouselInterval * 1000)
    }

    const PauseCarouselSlide = () => {
        console.log('exited');
        clearInterval(StepsCarouselIntervalRef);
    }

    return (
        <div ref={ref => pageContentRef = ref} id='pageContent' style={{ padding: `${isMobile ? Theme.SecSpacingMob : Theme.SecSpacingDesk}px 0px` }} >

            <div className='container'>
                <div className={styles.pageContent}>

                    <AnimatedSection id={'Content-1'} animationClass={'shiftRight'}>
                        <div className='sectionHead'>
                            <h5 className='heading1'>Who we are?</h5>
                            <p className={'bodyText'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas</p>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            <ViewportTracker id='contentPage' onEnter={() => PlayCarouselSlide()} onLeave={() => PauseCarouselSlide()} >
                <div className={styles.cardContainer} style={isMobile ? { backgroundImage: 'none' } : {}} >
                    <div className='container'>
                        <div className={styles.pageContent}>

                            <Grid container spacing={isTablet ? 3 : 9} >

                                <Grid item xs={12} md={6} style={{ position: 'relative' }}>
                                    <div className={classNames(styles.StepsContainer, { [styles.StepsContainer_T]: isTablet, [styles.StepsContainer_M]: isMobile })}>
                                        {
                                            !isTablet && (
                                                <div className='shape2'>
                                                    <img src={'/assets/images/counsellingShape2.png'} alt='' />
                                                </div>
                                            )
                                        }
                                        {
                                            Steps.map((step: stepItem, index: number) => {
                                                return renderStep(step, index);
                                            })
                                        }
                                    </div>
                                </Grid>

                                <Grid item xs={12} md={6}>

                                    <div className={styles.CarouselContainer}>
                                        <Carousel
                                            autoPlay={false}
                                            index={carouselIndex}
                                            navButtonsAlwaysInvisible
                                            indicators={false}
                                            animation='slide'
                                            timeout={500} >
                                            {
                                                Steps.map((step: stepItem, index: number) => {
                                                    return renderCarouselItem(step, index);
                                                })
                                            }
                                        </Carousel>
                                        <div className='buttonsContainer'>
                                            <IconButton onClick={() => slideCaousel('prev')}>
                                                <KeyboardArrowLeft />
                                            </IconButton>

                                            <IconButton onClick={() => slideCaousel('next')}>
                                                <KeyboardArrowRight />
                                            </IconButton>
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>


                            {/* <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', margin: '20px 0', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', width: '100%', height: 2, backgroundColor: '#ccc' }} ></div>
                    <div style={{ position: 'absolute', padding: 10, backgroundColor: Theme.backgroundColor, }}>
                    <Button variant='contained' size='large' color='primary'>Get Started For Free</Button>
                    </div>
                </div> */}

                        </div>
                    </div>
                </div>
            </ViewportTracker >
        </div >
    )
}


export const CounsellingFormSection = () => {

    type FormTypes = 'student' | 'parent';

    const styles = CounsellingStyles();
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');
    const [formType, setFormType] = React.useState<FormTypes>('student');

    const changeFormType = (type: FormTypes) => {
        if (formType !== type) {
            setFormType(type);
        }
    }

    const SectionHead = () => {
        return (
            <div className={styles.textWrap}>

                <Typography variant='body1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat magni, nihil corrupti.</Typography>
            </div>
        )
    }

    return (

        <div className={classNames(styles.mainContainer)} ref={ref => CounsellingSectionRef = ref}>

            <div className={'container'}>

                <Typography variant={isMobile ? 'h5' : 'h4'}>
                    <span>Fill your details </span>
                    <span style={{ fontFamily: 'gorditaBold', color: Theme.primary }}>for counselling</span>
                </Typography>

                <div style={{ margin: '30px 0' }}>
                    <Grid container spacing={4} >

                        <Hidden smDown>
                            <Grid item md={6} >
                                <div className='leftSec'>

                                    <div className={'imageWrap'}>
                                        <img className={classNames({ 'active': formType === 'student' })} src='/assets/images/for-student.png' alt='' />
                                        <img className={classNames({ 'active': formType === 'parent' })} src='/assets/images/for-parent.png' alt='' />
                                    </div>

                                    <div style={{ textAlign: 'left' }}>
                                        <Typography variant='body1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat magni, nihil corrupti.</Typography>
                                        <Button variant='outlined' color='primary' ><PhoneRounded style={{ fontSize: 20, marginRight: 5 }} />Contact Us</Button>
                                    </div>
                                </div>
                            </Grid>
                        </Hidden>

                        <Grid item className={'rightSec'} xs={12} md={6} >

                            <div style={{ width: '100%' }}>


                                <div style={{ width: '100%', display: 'flex', justifyContent: isTablet ? 'center' : 'flex-end' }}>
                                    <div className={styles.formContainer}>
                                        <FormHead
                                            titleProps={{
                                                style: {
                                                    color: Theme.primary,
                                                    fontSize: 24,
                                                    marginBottom: 0
                                                }
                                            }}
                                            title='Fill the details here'
                                        />

                                        <p className={styles.formToggler}>
                                            <span
                                                className={classNames({ 'active': formType === 'student' })}
                                                onClick={() => changeFormType('student')}>Student</span>
                                                /
                                                <span
                                                className={classNames({ 'active': formType === 'parent' })}
                                                onClick={() => changeFormType('parent')}>Parent</span>
                                        </p>
                                        <div className={styles.formsWrapper}>
                                            <Collapse in={formType === 'student'}>
                                                <CounsellingForm onFormTypeChange={() => changeFormType('parent')} />
                                            </Collapse>

                                            <Collapse in={formType === 'parent'}>
                                                <CounsellingFormParent onFormTypeChange={() => changeFormType('student')} />
                                            </Collapse>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div >
    )
}


export const FeaturesSection = () => {

    interface Feature {
        title: string,
        description: string,
    }
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    const [__window, setWindow] = React.useState<null | Window>(null);

    React.useEffect(() => {
        setWindow(window);
    }, [])

    const Features: Feature[] = [
        { title: 'Universities', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
        { title: 'colleges', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
        { title: 'coachings', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
        { title: 'top courses', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
        { title: 'boards', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
        { title: 'exams', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
        { title: 'career options', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
        { title: 'news', description: 'Lorem ipsum dolor sit amet,lit tellus, luctus nec ullamcorper mattis' },
    ]

    const styles = FeatureSectionStyles();

    const renderFeatureCard = (item: Feature, index: number) => {
        const { title, description } = item;
        return (
            <AnimatedSection key={index} id={index} animationClass={'shiftUp'} >
                <div className={styles.card}>
                    <Card style={{ maxWidth: `100%`, boxShadow: 'none' }}>
                        <CardActionArea style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'unset'
                        }}>
                            <div style={{ padding: '15px 15px 0px', width: '100%' }}>
                                <CardMedia
                                    style={{
                                        width: '100%',
                                        maxHeight: 180,
                                        minHeight: 160,
                                        margin: '0px auto',
                                        borderRadius: Theme.radius2,
                                        backgroundColor: 'gray'
                                    }}
                                    image={`/assets/images/feature${index + 1}.png`} />
                            </div>
                            <CardContent className='infoWrap'>
                                <Typography className='title' variant={'h6'}>{title}</Typography>
                                <Typography className='desc' variant={'body1'}>{description}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </AnimatedSection>
        )
    }

    return (
        <div style={{ margin: `${isMobile ? Theme.SecSpacingMob : Theme.SecSpacingDesk}px 0` }}>
            {/* <img src='assets/images/stats-bg.jpg' alt='' /> */}
            {/* <div className={styles.statsBacgroundOverlay} ></div> */}

            <div className="container">
                <div className={styles.FeaturesContainer} >
                    <AnimatedSection animationClass='shiftUp' id={'text'} >
                        <div className='sectionHead'>
                            <h5 className='heading1'>Our Features</h5>
                            <p className={'bodyText'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ducimus corporis quas</p>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            <div className={styles.FeaturesBackground} style={isMobile ? { backgroundImage: 'none' } : {}}>
                <div className="container">
                    <div className={styles.FeaturesContainer} >
                        {
                            isMobile || (__window?.innerWidth / 2 < 315) ?
                                <Carousel
                                    animation='slide'
                                    autoPlay={false}
                                    navButtonsAlwaysVisible
                                    indicators={true}
                                    timeout={500} interval={3000}
                                    activeIndicatorProps={{ style: { color: Theme.secondary }, className: '' }}
                                >
                                    {
                                        Features.map((item: Feature, index: number) => renderFeatureCard(item, index))
                                    }
                                </Carousel >
                                : <Grid container spacing={8} justify='center'>
                                    {
                                        Features.map((item: Feature, index: number) => {
                                            return (<Grid key={index} item
                                                xs={(typeof (window) !== 'undefined' ? window : undefined)?.innerWidth / 2 >= 315 ? 6 : 12}
                                                sm={(typeof (window) !== 'undefined' ? window : undefined)?.innerWidth / 3 >= 315 ? 4 : 6}
                                                md={(typeof (window) !== 'undefined' ? window : undefined)?.innerWidth / 2 >= 315 ? 3 : 4}
                                                style={{ maxWidth: 315 }}
                                            >
                                                {
                                                    renderFeatureCard(item, index)
                                                }
                                            </Grid>)
                                        })
                                    }
                                </Grid>
                        }

                    </div>
                </div>
            </div>
        </div >
    )

}