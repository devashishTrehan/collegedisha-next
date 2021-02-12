
import { SubscribeSection } from '@/Components/Subscribe.component';
import * as React from 'react';
import { Footer } from '@/Components/Footer.component';
import { ContentCards, Header, CounsellingFormSection, FeaturesSection } from '@/Components/HomeSections';
import { AlertBox } from '@/Components/AlertBox.component';
import { SetCookie, Storages } from '@/Services/App.service';
import { AppContext } from '@/Context/App.context';
import { MailSent } from '@/Components/MailSent.component';



const Home = React.memo(function () {

  const { showModal } = React.useContext(AppContext);

  React.useEffect(() => {
    SetCookie(Storages.UserId, 5, 5);
    SetCookie(Storages.AccessToken, 'abcdefghidef7648hvy45t98vn-4vy-n56im0u3cukgjkvwt67yndt', 5);
  }, [])


  console.log('rendering home')
  return (
    <>
      {/* <NavBar home={true} /> */}
      {/* <button onClick={() => showModal(<MailSent email='devashishTrehan@gmail.com' />)}>show</button> */}

      <Header />

      <ContentCards />

      <CounsellingFormSection />

      <FeaturesSection />

      <SubscribeSection />

      <Footer />

    </>

  );
})

export default Home;
