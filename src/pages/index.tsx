
import { SubscribeSection } from '@/Components/Subscribe.component';
import * as React from 'react';
import { Footer } from '@/Components/Footer.component';
import { ContentCards, Header, CounsellingFormSection, FeaturesSection } from '@/Components/HomeSections';
import { AlertBox } from '@/Components/AlertBox.component';
import { SetCookie, Storages } from '@/Services/App.service';



function Home(props: any) {


  React.useEffect(() => {
  }, [])


  return (

    <>
      {/* <NavBar home={true} /> */}

      <Header />
      <ContentCards />
      <CounsellingFormSection />
      <FeaturesSection />
      <SubscribeSection />
      {/* <StatSection /> */}

      <Footer />

    </>

  );
}

export default Home;
