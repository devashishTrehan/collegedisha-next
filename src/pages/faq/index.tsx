
import { Accordion, AccordionDetails, AccordionSummary, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { Theme } from '@/Services/App.service';
import classNames from 'classnames';
import { PageHead } from '@/Components/PageHead.component';
import { Footer } from '@/Components/Footer.component';
import { ExpandMore, } from '@material-ui/icons';


const useStyles = makeStyles({
  wrapper: {
    padding: ' 0px 5% 50px',
  },
  questionListContainer: {
    width: 820,
    maxWidth: '100%',
    margin: '50px auto',
    boxShadow: Theme.boxShadow,
    borderRadius: Theme.radius2,
    overflow: 'hidden'
  },
  questionContainer: {
    boxShadow: 'none',
    '& ul': {
      listStyle: 'none',
      textAlign: 'left',
      '& li': {
        padding: '0 15px',
        marginBottom: 20,
        '& h6': {
          fontWeight: 600,
          fontSize: 16,
          color: '#444',
          marginBottom: 5,
        },
        '& p': {
          fontSize: 13,
          color: '#374957',
          lineHeight: '28px'
        }
      }
    }
  },
  questionContainer_M: {
    '& ul': {
      '& li': {
        padding: '0px',
        marginBottom: 20,
        '& p': {
          lineHeight: '25px'
        }
      }
    }
  },
  heading: {
    fontSize: 16,
    fontFamily: 'gorditaMedium',
    color: Theme.primary,
    padding: 15,
    textAlign: 'left',
  },
  heading_M: {
    padding: '10px 0',
  }
})

interface AnswerPoint {
  title?: string,
  description: string,
}

interface FAQPoint {
  question: string,
  answer: AnswerPoint[],
}

interface FAQListProps {
  FQuestion: FAQPoint,
  index: number,
}


function FAQPage(props: any) {

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:992px)');

  const styles = useStyles();


  const FAQList: FAQPoint[] = [
    {
      question: 'How to register on College disha.com?', answer: [
        {
          title: 'Registration',
          description: 'First of all, go to the top right corner of page and click on “Register”. Now you will see a registration form, just fill it . This will take you hardly 2 minutes to fill up. Once you fill that form, submit your information & verify your mobile number. After verification, you can enjoy the various benefits.'
        },
        {
          title: 'Is it compulsory to add the mobile number?',
          description: 'Yes, mobile number is needed for verification and also ensure account safety.'
        },
        {
          title: 'Can I edit my profile on Shiksha?',
          description: 'Yes, you can easily edit your profile information. Here\'s how to do it'
        },
        {
          title: 'Update the email id',
          description: 'Well, you can’t change email ID as it is mapped to your account at the time of registration. But you can add your alternate email ID. Go to your ‘Personal Information’ section & simply create a new account with your new email ID.'
        },
        {
          title: 'Password Change',
          description: 'To change your password, navigate to account homepage and click \'Settings\'. After that, change your new password and save the details.'
        },
        {
          title: 'Update my mobile number',
          description: "It is extremely easy to do that, just go to your ‘Profile’ page, click ‘Edit’ on the ‘Personal Information’ section. Modify your new mobile number. Once you do that, click ‘Save’."
        },
        {
          title: 'Update profile details',
          description: 'You can update your profile information which includes personal information, educational background etc.'
        },
        {
          title: 'Update communication preferences',
          description: 'You can change or update your ‘Communication Preferences’ under ‘Settings’ to start or stop receiving email notifications from Collegedisha. This is useful mail, especially delivered to your inbox to serve your information needs such as college application deadlines, exam dates based on your profile. If you no longer need this service, uncheck the box under ‘Communication Preferences’ and after that you will not receive further emails.'
        },
        {
          title: 'Update my profile photo',
          description: 'Point the mouse over your profile photo box. After that, upload the image from your system.'
        },
        {
          title: 'Is all information necessary to create a user profile?',
          description: 'Well, there is no need for that. But there are some field in which you have to enter the value such as your full name, mobile no. and email id, the rest of the fields are optional.'
        },
        {
          title: 'Privacy settings for your profile',
          description: 'You have adequate control on your College disha profile privacy. All the fields that have a privacy icon can be set “ON” or “OFF” by you to show or hide those details from public view.'
        },
      ]
    },
    {
      question: 'How to search for college and courses?', answer: [{
        description: "If you want to search for a particular college or course, just enter its name in the search box on top of College Disha homepage. As you start typing, you'll see a drop-down, from here you can choose the name of your desired course/college without any hassle.If you want to search college by categories - , Engineering or Management, just move to the top global navigation bar. Here you will see an option for categories, you can search for popular courses, colleges by location, top colleges and even compare colleges."
      }]
    },
    {
      question: 'How can College disha help you in making the right college decision?', answer: [{
        description: 'Suppose if you are planning to do MBA/B.Tech, we are here to guide you to make an informed career and college decision. It is extremely easy for students to shortlist your target colleges through our easy-to-use College Disha tools. If you have any questions regarding any college then contact our experts as they are always available to guide you. If you have completed your graduation, you can rate your college. This will help those students who are looking for reliable information about your college.'
      }]
    },
    {
      question: 'Can College disha help in making a career choice?', answer: [{
        description: "Decide the right career for yourself is one of the toughest task for everyone. Once a student finishes his/her intermediate school, there is the world of carrier options in front of students. Well, it is easy to decide a mall where you would like to hang out but when it comes to deciding the right college or course, it becomes one of the complicated task. But you need not to get worried for anything as we have best education counselors who will guide you in making the right decision.\n If you ask from them which course should I opt for, they will give you the best possible advice.If you want to ask anything from experts, just click on the 'Ask a New Question' bar and post your queries. On the other hand, if you want to answer a question, just click on the question, and it will take you on the discussion page. Then tap on 'Add a Comment' bar and post your answer."
      }]
    },
    {
      question: 'How can you stay updated with the latest news?', answer: [{
        description: 'If you want to the latest information about colleges, just read articles as they will provide you all your education related information. Infact, you can check the news for entrance exam dates, application deadlines etc.'
      }]
    },
    {
      question: 'Can you unsubscribe to emails?', answer: [{
        description: "Yes, you can unsubscribe yourself from our services at any time. Uncheck the box that is shown under 'Communication Preferences' on your Profile homepage."
      }]
    },
    {
      question: 'Can you contact College disha?', answer: [{
        description: 'If you have any feedback/ suggestions for the website, you can write to us at: feedback@collegedisha.com or call on our Student helpline number: 0120-4309202/ 919717828595 at any time.'
      }]
    },
  ]



  const RenderFAQCard = (props: FAQListProps) => {

    const { index, FQuestion: { question, answer } } = props;


    return (

      <Accordion key={index} TransitionProps={{ unmountOnExit: true }} square={true} className={classNames(styles.questionContainer, { [styles.questionContainer_M]: isMobile })} >
        <AccordionSummary
          expandIcon={<ExpandMore />}

          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classNames(styles.heading, { [styles.heading_M]: isMobile })} variant='h4'>{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <ul>
              {
                answer?.map((point: AnswerPoint) => {
                  return (
                    <li>
                      {
                        point.title ?
                          <Typography variant='h6'>{point.title}</Typography>
                          : null
                      }
                      <Typography>{point.description}</Typography>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    )
  }

  const FAQCard = React.useMemo(() => RenderFAQCard, []);


  React.useEffect(() => {
  }, [])

  return (

    <>
      <PageHead PageName='FAQ' />

      <div className='container'>

        <div className={styles.wrapper}>

          <div className={styles.questionListContainer}>
            {
              FAQList?.map((question: FAQPoint, index: number) => {
                return <FAQCard FQuestion={question} index={index} />
              })
            }
          </div>

        </div>

      </div>

      <Footer />
    </>

  );
}

export default FAQPage;