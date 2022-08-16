(($)=>{

  class nie {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.qucikBox();      
    }
    header(){
      let t = false;
      
          // 서브 메뉴 slideDown    
          $('#header .main-btn').on({
            mouseenter:function(){
              if(!$('#nav').hasClass('on')){
                $('#header .sub-box').hide();
                $(this).next().slideDown(400);
                $('#header').css({zIndex:4});
                $('#blackBg').fadeIn(400).css({zIndex:3});
                $('#nav').addClass('on');
              }
              else {
                $('#header .sub-box').hide();
                $(this).next().show();            
              }
            },
            focusin:function(){
              if(!$('#nav').hasClass('on')){
                $('#header .sub-box').fadeOut();
                $(this).next().slideDown(400);
                $('#header').css({zIndex:4});
                $('#blackBg').fadeIn(400).css({zIndex:3});
                $('#nav').addClass('on');
              }
              else {
                $('#header .sub-box').hide();
                $(this).next().show();            
              }
            }
          });

          $('#nav').on({
            mouseleave:function(){          
              $('#header .sub-box').slideUp(400);
              $(this).removeClass('on');
              $('#header').css({zIndex:3});
              $('#blackBg').fadeOut(400).css({zIndex:0});
            }
          });

          // 사이트맵 오픈
          $('#header .sitemap-btn').on({
            click:function(e){
              e.preventDefault();
              $('#header').toggleClass('sitemap-open');            
              if(t===false){            
                $('#header .sitemap').stop().fadeIn(300);
                t=true;
              }
              else{            
                $('#header .sitemap').stop().fadeOut(300);
                t=false;
              }          
            }
          });
    }
    section1(){      
      let setId='';
      let setId2='';
      let cnt=0;          

          // 이전, 다음 버튼
          $('#section1 .prev-btn').on({
            click:function(e){
              e.preventDefault();
              if($('#section1 .slide').is(':animated')) return;             
              prevSlide();
              reStart();                                                                                     
            }
          })

          $('#section1 .next-btn').on({
            click:function(e){
              e.preventDefault();           
              if($('#section1 .slide').is(':animated')) return;                                   
              nextCount();
              reStart();           
            }
          })

          // 메인 슬라이드
          function nextSlide(){      
            $('#section1 .slide').css({zIndex:1});
            $('#section1 .slide').eq(cnt).stop().animate({zIndex:2,opacity:1}, 400);
            $('#section1 .slide').eq(cnt==0?2:cnt-1).stop().animate({zIndex:3,opacity:0}, 400);                
          }

          function prevSlide(){
            cnt--;
            cnt<0?cnt=2:cnt;            
            $('#section1 .slide').css({zIdex:1});
            $('#section1 .slide').eq(cnt).stop().animate({zIndex:2,opacity:1}, 400);
            $('#section1 .slide').eq(cnt==2?0:cnt+1).stop().animate({zIndex:3,opacity:0}, 400);               
          }
          
          function nextCount(){
            cnt++;
            cnt>2?cnt=0:cnt;
            nextSlide();
          }
          
          function autoTimer(){
            setId=setInterval(nextCount, 18000);        
          }
          autoTimer();

          // 재시작 
          function reStart(){
            let cnt2=0;            
                clearInterval(setId);
                clearInterval(setId2);            
                setId2=setInterval(function(){
                  cnt2++;
                  if(cnt2>15){
                    clearInterval(setId2);
                    nextCount();
                    autoTimer();                                       
                  }                  
                }, 1000);
          }      
    }
    section2(){
      let sec2Top=$('#section2').offset().top-$(window).height();
      let winW=$(window).width();      
      let cnt=0;     
      
          // resize
          $(window).resize(function(){
            winW=$(window).width();            
            $('#section2 .list-view').css({width:winW});
            $('#section2 .exh-container').css({width:winW});
            $('#section2 .exh-view').css({width:winW*0.828125});                  
            $('#section2 .eco').css({width:winW});
            $('#section2 .eco ul').css({width:winW});
            $('#section2 .map').css({width:winW});
            // $('#section2 .eco ul li a').css({width:winW*0.1484375,height:winW*0.2});            
          });

          // P
          $(window).scroll(()=>{
            if($(window).scrollTop()>sec2Top){
              $('#section2').addClass('sec2Ani');
            }
            if($(window).scrollTop()===0){
              $('#section2').removeClass('sec2Ani');
            }
          });

          // 메뉴 탭 키 클릭 시
          $('#section2 .sec2-tab').each(function(idx){
            $(this).on({
              click:function(e){
                e.preventDefault();
                $('#section2 .sec2-tab').removeClass('on');
                $(this).addClass('on');
                cnt=idx;
                // $('#section2 .list-wrap').stop().animate({left:`${-100*cnt}%`}, 300);
                $('#section2 .list-wrap').stop().animate({left:-winW*cnt}, 300);
              }
            });
          });

          $('#section2 .prev-btn').on({
            click:function(e){          
              e.preventDefault();
              cnt--;
              exhSlide();       
            }
          });
          
          $('#section2 .next-btn').on({
            click:function(e){
              e.preventDefault();
              cnt++;          
              exhSlide();        
            }
          });

          // map 
          $('#section2 .area-btn').each(function(idx){
            $(this).on({
              mouseenter:function(){
                $('#section2 .area-btn2').removeClass('on');
                $('#section2 .area-btn2').eq(idx).addClass('on');
              }
            })
          });
          
          $('#section2 .area-btn2').each(function(idx){
            $(this).on({
              mouseenter:function(){
                $('#section2 .area-btn').removeClass('on');
                $('#section2 .area-btn').eq(idx).addClass('on');
              }
            })
          });
          
          $('#section2 .area-btn, #section2 .area-btn2').on({
            mouseleave:function(){
              $('#section2 .area-btn').removeClass('on');              
              $('#section2 .area-btn2').removeClass('on');              
            }
          })

          // Exh 슬라이드
          function exhSlide(){
            $('#section2 .exh-wrap').stop().animate({left:-321*cnt}, 300, function(){
              cnt>7?cnt=0:cnt;
              cnt<0?cnt=7:cnt;
              $('#section2 .exh-wrap').stop().animate({left:-321*cnt}, 0);
            });
          }
      
    }
    section3(){
      let sec3Top=$('#section3').offset().top-$(window).height();
      let cnt=0;
      let cnt2=0;
      let thum='';
      let subthum='';
      let thumon='';
      let text='';               

          // P
          $(window).scroll(()=>{
            if($(window).scrollTop()>sec3Top){
              $('#section3').addClass('sec3Ani');
            }
            if($(window).scrollTop()===0){
              $('#section3').removeClass('sec3Ani');
            }
          });

          // 메뉴 탭 키 클릭 시
          $('#section3 .sec3-tab').each(function(idx){
            $(this).on({
              click:function(e){
                e.preventDefault();
                $('#section3 .sec3-tab').removeClass('on');
                $(this).addClass('on');
                $('#section3 .cont').hide();
                $('#section3 .cont').eq(idx).show();
              }
            });
          });
          
          // 이전, 다음버튼 클릭 : 썸네일, 서브 썸네일, 텍스트 변경
          $('#section3 .prev-btn').each(function(idx){            
            $(this).on({
              click:function(e){
                e.preventDefault();                
                if(idx===0){
                  thum=$('#section3 .thum-wrap1');                                  
                  subthum=$('#section3 .sub-thum-wrap1');                                  
                  thumon=$('#section3 .sub-thum1');                                  
                  text=$('#section3 .text1');               
                }
                else if(idx===1){
                  thum=$('#section3 .thum-wrap2');   
                  subthum=$('#section3 .sub-thum-wrap2');                
                  thumon=$('#section3 .sub-thum2');                                  
                  text=$('#section3 .text2'); 
                }
                else{
                  thum=$('#section3 .thum-wrap3');
                  subthum=$('#section3 .sub-thum-wrap3');                   
                  thumon=$('#section3 .sub-thum3');                                  
                  text=$('#section3 .text3'); 
                }
                cnt--;
                cnt2--;
                active();
              }
            })          
          })

          $('#section3 .next-btn').each(function(idx){
            $(this).on({
              click:function(e){
                e.preventDefault();
                if(idx===0){
                  thum=$('#section3 .thum-wrap1');                                  
                  subthum=$('#section3 .sub-thum-wrap1');                                  
                  thumon=$('#section3 .sub-thum1');                                  
                  text=$('#section3 .text1');          
                }
                else if(idx===1){
                  thum=$('#section3 .thum-wrap2');   
                  subthum=$('#section3 .sub-thum-wrap2');                
                  thumon=$('#section3 .sub-thum2');                                  
                  text=$('#section3 .text2');
                }
                else{
                  thum=$('#section3 .thum-wrap3');
                  subthum=$('#section3 .sub-thum-wrap3');                   
                  thumon=$('#section3 .sub-thum3');                                  
                  text=$('#section3 .text3');                  
                }
                cnt++;
                cnt2++;
                active();                       
              }
            })
          })

          // 서브 썸네일 직접 클릭
          $('#section3 .sub-thum').each(function(idx){
            $(this).on({
              click:function(e){
                e.preventDefault();                         
                if(idx<=12){
                  thum=$('#section3 .thum-wrap1');                                  
                  subthum=$('#section3 .sub-thum-wrap1');                                  
                  thumon=$('#section3 .sub-thum1');                                  
                  text=$('#section3 .text1');                
                  cnt=idx;
                  cnt2=idx;                  
                }
                else if(idx<=24){
                  thum=$('#section3 .thum-wrap2');   
                  subthum=$('#section3 .sub-thum-wrap2');                
                  thumon=$('#section3 .sub-thum2');                                  
                  text=$('#section3 .text2');                
                  cnt=idx-12;
                  cnt2=idx-12;
                }
                else{
                  thum=$('#section3 .thum-wrap3');
                  subthum=$('#section3 .sub-thum-wrap3');                   
                  thumon=$('#section3 .sub-thum3');                                  
                  text=$('#section3 .text3');
                  cnt=idx-24;
                  cnt2=idx-24;
                }
                active();
              }
            });
          });

          function active(){            
            thumSlide();            
            subThumSlide(); 
          } 

          function thumSlide(){                               
            thum.stop().animate({left:-358*cnt}, 300, function(){
              cnt>5?cnt=0:cnt;
              cnt<0?cnt=5:cnt;
              thum.stop().animate({left:-358*cnt}, 0);
            });
            // 텍스트 변경
            cnt>5?cnt=0:cnt;
            cnt<0?cnt=5:cnt;
            text.removeClass('on');
            text.eq(cnt).addClass('on');
          }
          
          function subThumSlide(){            
            subthum.stop().animate({left:-161*cnt2}, 300, function(){
              cnt2>5?cnt2=0:cnt2;
              cnt2<0?cnt2=5:cnt2;          
              subthum.stop().animate({left:-161*cnt2}, 0);
            });
            // 서브썸 on
            cnt2>5?cnt2=0:cnt2;
            cnt2<0?cnt2=5:cnt2;             
            thumon.removeClass('on');
            thumon.eq(cnt).addClass('on');
          }
    }
    section4(){
      let sec4Top=$('#section4').offset().top-$(window).height();
      let cnt1=0;  // photo      
      let setId1='';
      let setId2='';
      let cnt2=0; // video       
      let setId3='';
      let setId4='';
      let cnt3=0; // popup      
      let setId5='';
      let setId6='';
      let cnt4=0; // banner      
      let setId7='';
      let setId8='';
      let cnt5=0; // sns      
      let cnt6=0; // notice      
      let cnt7=0; // news
              
          // P
          $(window).scroll(()=>{
            if($(window).scrollTop()>sec4Top){
              $('#section4').addClass('sec4Ani');
            }
            if($(window).scrollTop()===0){
              $('#section4').removeClass('sec4Ani');
            }
          });

          // 이전, 다음 버튼
          $('#section4 .prev-btn').each(function(idx){        
            $(this).on({
              click:function(){                
                if(idx===0){
                  photoPrev();
                }                                
                else if(idx===1){
                  videoPrev();
                }                                
                else if(idx===2){
                  popupPrev();
                }               
                else{
                  bnrPrev();
                }                 
              }
            });
          });

          $('#section4 .next-btn').each(function(idx){        
            $(this).on({
              click:function(){                
                if(idx===0){
                  photoNext();
                }                                
                else if(idx===1){
                  videoNext();
                }                                
                else if(idx===2){
                  popupNext();
                }                                
                else{
                  bnrNext();
                }
              }
            });
          });

          // 정지 버튼
          $('#section4 .pause-btn').each(function(idx){
            $(this).on({
              click:function(){                
                if(idx===0){
                  if($(this).hasClass('on fa fa-play')){
                    clearInterval(setId1);
                    clearInterval(setId2);
                    $(this).removeClass('on fa fa-play');
                    photoNext();
                    photoTimer();
                  }
                  else{
                    $(this).addClass('on fa fa-play');                  
                    photoReStart();
                  }
                }
                else if(idx===1){
                  if($(this).hasClass('on fa fa-play')){
                    clearInterval(setId3);
                    clearInterval(setId4);
                    $(this).removeClass('on fa fa-play');
                    videoNext();
                    videoTimer();
                  }
                  else{
                    $(this).addClass('on fa fa-play');
                    videoReStart();
                  }
                }
                else if(idx===2){
                  if($(this).hasClass('on fa fa-play')){
                    clearInterval(setId5);
                    clearInterval(setId6);
                    $(this).removeClass('on fa fa-play');
                    popupNext();
                    popupTimer();
                  }
                  else{
                    $(this).addClass('on fa fa-play');
                    popupReStart();
                  }
                }
                else{
                  if($(this).hasClass('on fa fa-play')){
                    clearInterval(setId7);
                    clearInterval(setId8);
                    $(this).removeClass('on fa fa-play');
                    bnrNext();
                    bnrTimer();
                  }
                  else{
                    $(this).addClass('on fa fa-play');
                    bnrReStart();
                  }
                }
              }
            });
          });

          // 포토
          function photoSlide(){                               
            $('#section4 .photo-wrap').stop().animate({left:-262*cnt1}, 500, function(){          
                cnt1>5?cnt1=0:cnt1;
                cnt1<0?cnt1=5:cnt1;
                $('#section4 .photo-wrap').stop().animate({left:-262*cnt1}, 0);
            });
          }        

          function photoPrev(){
            cnt1--;
            photoSlide();
          }

          function photoNext(){        
            cnt1++;                        
            photoSlide(); 
          }

          function photoTimer(){
            setId1=setInterval(photoNext, 8000);
          }
          photoTimer();

            // 재시작 
            function photoReStart(){
              let cnt1Re=0;            
                  clearInterval(setId1);
                  clearInterval(setId2);            
                  setId2=setInterval(function(){
                    cnt1Re++;
                    if(cnt1Re>15){
                      clearInterval(setId2);
                      $('#section4 .pause-btn').eq(0).removeClass('on fa fa-play');
                      photoNext();
                      photoTimer();                                       
                    }                  
                  }, 1000);
            }
          
          // 비디오
          function videoSlide(){                               
            $('#section4 .video-wrap').stop().animate({left:-262*cnt2}, 500, function(){
                cnt2>5?cnt2=0:cnt2;
                cnt2<0?cnt2=5:cnt2;
                $('#section4 .video-wrap').stop().animate({left:-262*cnt2}, 0);
            });
          }

          function videoPrev(){
            cnt2--;
            videoSlide();
          }

          function videoNext(){        
            cnt2++;                        
            videoSlide(); 
          }

          function videoTimer(){
            setId3=setInterval(videoNext, 8000);
          }
          videoTimer();

            // 재시작 
            function videoReStart(){
              let cnt2Re=0;            
                  clearInterval(setId3);
                  clearInterval(setId4);            
                  setId4=setInterval(function(){
                    cnt2Re++;
                    if(cnt2Re>15){
                      clearInterval(setId4);
                      $('#section4 .pause-btn').eq(1).removeClass('on fa fa-play');
                      videoNext();
                      videoTimer();                                       
                    }                  
                  }, 1000);
            }
          
          // 팝업
          function popupSlide(){                               
            $('#section4 .popup-wrap').stop().animate({left:-262*cnt3}, 500, function(){
                cnt3>9?cnt3=0:cnt3;
                cnt3<0?cnt3=9:cnt3;
                $('#section4 .popup-index').html(cnt3+1);
                $('#section4 .popup-wrap').stop().animate({left:-262*cnt3}, 0);                
            });
          }

          function popupPrev(){
            cnt3--;
            popupSlide();
          }

          function popupNext(){        
            cnt3++;                        
            popupSlide(); 
          }

          function popupTimer(){
            setId5=setInterval(popupNext, 5000);
          }
          popupTimer();

            // 재시작 
            function popupReStart(){
              let cnt3Re=0;            
                  clearInterval(setId5);
                  clearInterval(setId6);            
                  setId6=setInterval(function(){
                    cnt3Re++;
                    if(cnt3Re>15){
                      clearInterval(setId6);
                      $('#section4 .pause-btn').eq(2).removeClass('on fa fa-play');
                      popupNext();
                      popupTimer();                                       
                    }                  
                  }, 1000);
            }
          
          // 배너
          function bnrSlide(){                               
            $('#section4 .bnr-wrap').stop().animate({left:-262*cnt4}, 500, function(){
                cnt4>3?cnt4=0:cnt4;
                cnt4<0?cnt4=3:cnt4;
                $('#section4 .bnr-index').html(cnt4+1);
                $('#section4 .bnr-wrap').stop().animate({left:-262*cnt4}, 0);
            });
          }

          function bnrPrev(){
            cnt4--;
            bnrSlide();
          }

          function bnrNext(){        
            cnt4++;                        
            bnrSlide(); 
          }

          function bnrTimer(){
            setId7=setInterval(bnrNext, 5000);
          }
          bnrTimer();

            // 재시작 
            function bnrReStart(){
              let cnt4Re=0;            
                  clearInterval(setId7);
                  clearInterval(setId8);            
                  setId8=setInterval(function(){
                    cnt4Re++;
                    if(cnt4Re>15){
                      clearInterval(setId8);
                      $('#section4 .pause-btn').eq(3).removeClass('on fa fa-play');
                      bnrNext();
                      bnrTimer();                                       
                    }                  
                  }, 1000);
            }
      
          // sns 슬라이드
          $('#section4 .prev-box').on({
            click:function(e){
              e.preventDefault();
              cnt5--;
              snsSlide();
            }
          });
          
          $('#section4 .next-box').on({
            click:function(e){
              e.preventDefault();
              cnt5++;
              snsSlide();
            }
          });

          function snsSlide(){
            $('#section4 .sns-wrap').stop().animate({left:-230*cnt5}, 300, function(){
              cnt5>20?cnt5=0:cnt5;
              cnt5<0?cnt5=20:cnt5;
              $('#section4 .sns-wrap').stop().animate({left:-230*cnt5}, 0);
            });
          }

          // 인포 슬라이드
          $('#section4 .top-btn').each(function(idx){        
            $(this).on({
              click:function(e){
                e.preventDefault();
                if(idx===0){
                  ntcTop();
                }                                
                else{
                  newsTop();
                }                                
              }
            });
          });
          
          $('#section4 .bottom-btn').each(function(idx){        
            $(this).on({
              click:function(e){
                e.preventDefault();
                if(idx===0){
                  ntcBtm()
                }                                
                else{
                  newsBtm()
                }                                
              }
            });
          });

          // notice
          function ntcSlide(){
            $('#section4 .ntc-wrap').stop().animate({top:-24*cnt6}, 300, function(){
              cnt6>4?cnt6=0:cnt6;
              cnt6<0?cnt6=4:cnt6;
              $('#section4 .ntc-wrap').stop().animate({top:-24*cnt6}, 0);
          });
          }

          function ntcTop(){
            cnt6--;
            ntcSlide();
          }
          
          function ntcBtm(){
            cnt6++;
            ntcSlide();
          }

          function ntcTimer(){
            setInterval(ntcBtm, 6000);
          }
          ntcTimer();
          
          // news
          function newsSlide(){
            $('#section4 .news-wrap').stop().animate({top:-24*cnt7}, 300, function(){
              cnt7>4?cnt7=0:cnt7;
              cnt7<0?cnt7=4:cnt7;
              $('#section4 .news-wrap').stop().animate({top:-24*cnt7}, 0);
          });
          }

          function newsTop(){
            cnt7--;
            newsSlide();
          }
          
          function newsBtm(){
            cnt7++;
            newsSlide();
          }

          function newsTimer(){
            setInterval(newsBtm, 6000);
          }
          newsTimer();
    }
    qucikBox(){
      let sec2Top=$('#section2').offset().top-($(window).height()/2);
      let sec3Top=$('#section3').offset().top-($(window).height()/2);
      let sec4Top=$('#section4').offset().top-($(window).height()/2);
      let footerTop=$('#footer').offset().top-($(window).height()/2);

          // 클릭 시      
          $('#quickBox .quick').each(function(idx){
            $(this).on({
              click:function(){            
                $('#quickBox .quick').removeClass('on');
                $('#quickBox .quick').eq(idx).addClass('on');     
                $('html, body').stop().animate({scrollTop:$(window).height()*idx},500);       
              }
            });
          });

          // 스크롤 시
          $(window).scroll(function(){
            if($(window).scrollTop()<=sec2Top){
              $('#quickBox .quick').removeClass('on');
              $('#quickBox .quick1').addClass('on');
            }
            else if($(window).scrollTop()<=sec3Top){
              $('#quickBox .quick').removeClass('on');
              $('#quickBox .quick2').addClass('on');
            }
            else if($(window).scrollTop()<=sec4Top){
              $('#quickBox .quick').removeClass('on');
              $('#quickBox .quick3').addClass('on');
            }
            else if($(window).scrollTop()<=footerTop){
              $('#quickBox .quick').removeClass('on');
              $('#quickBox .quick4').addClass('on');
            }
          });
    }
  }

  const newNie = new nie;
  newNie.init();

})(jQuery);