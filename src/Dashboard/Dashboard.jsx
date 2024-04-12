import Navbar from "../Navbar/Navbar";

export default function Dashboard() {
  return (
    <>
    <Navbar/>
    <div class="content-all">
      <div class="content-left">
        {/* Section Blance */}
        <div class="card-balance">
          <div class="space-between-center">
            <div class="font-24 black-color">Your Balance</div>
            <button class="btn-icon" onclick="openPopup()">
              <div class="font-12">Edit</div>
              <i class='bx bxs-pencil'></i>
          </button>
          </div>
          <div class="space-between-center">
            <div class="font-32 black-color">Rp</div>
            <div class="wrapper">
              <div id="amount" class="font-32 black-color">300.000.000,</div>
              <div class="font-20 black-color">68</div>
            </div>
            <i id="toggleIcon" class='bx bx-show icon-24 black-color'></i>
          </div>
        </div>
        {/* Section Deposit Decrease */}

        <div class="card-depo-decr">
          <div class="card-deposit">
            <div class="font-16 black-color">
              Unsued Balance
            </div>
            <div id="unusedBalance" class="font-16 black-color">
              Rp 500.000,00
            </div>
            <div class="wrapper gap-4">
              <i id="unusedIcon" class='bx bx-right-top-arrow-circle blue-color'></i>
              <div class="font-12 black-color">
                15,2%
              </div>
            </div>
          </div>
          <div class="card-deposit border-red">
            <div class="font-16 black-color">
              Used Balance
            </div>
            <div id="usedBalance" class="font-16 black-color">
              Rp 500.000,00
            </div>
            <div class="wrapper gap-4">
              <i id="usedIcon" class='bx bx-right-down-arrow-circle red-color' ></i>
              <div class="font-12 black-color">
                15,2%
              </div>
            </div>
          </div>
        </div>
        {/* Section Wallet */}
        <div class="card-wallet">
          <div class="space-between-top">
            <div class="space-between-top gap-4">
              <div class="font-24 black-color">Your Slots</div>
              <div class="font-12 black-color">(3)</div>
            </div>
            <button class="btn-icon" onclick="openPopslot()">
              <div class="font-12">Add New</div>
              <i class='bx bx-plus' ></i>
            </button>
            
          </div>
          <div class="card-content">
            <div class="swiper mySwiper">
              <div class="swiper-wrapper">
                {/* Here Card */}
                <div class="swiper-slide">
                  <div class="card-font">
                    <div class="space-between-top">
                      <div class="space-between-top gap-12">
                        {/* <img class="img-16" src="./asset/Vector.svg" alt=""> */}
                        <div class="font-14 white-to-white-color">Dompet 1</div>
                      </div>
                      <div class="dropdown">
                        {/* <img class="img-16" src="./asset/3dot.svg" alt=""> */}
                        <div class="dropdown-content">
                          {/* <a href="#" class="font-12">Delete</a> */}
                        </div>
                      </div>
                      
                    </div>
                    <div class="space-balance">
                      <div class="font-12 white-to-white-color">Balance</div>
                      <div class="font-16 white-to-white-color">Rp 200.000.000,00</div>
                    </div>
                    <div class="font-14 white-to-white-color">ANTM</div>

                  </div>
                </div>
              </div>
            </div>

          </div>
          </div>
        </div>
        <div class="content-right">
          <div class="card-statistic">
            <div class="space-between-center">
              <div class="font-24 black-color">Statistics</div>
              <button class="btn-icon">
                <div class="font-12">Week</div>
                <i class='bx bx-chevron-down font-16'></i>
              </button>
            </div>
            <div class="cart-all">
              <div class="cart-graph">
                <canvas id="myChart" width="30" height="12"></canvas>
              </div>
              <div class="cart-circle">
                <canvas id="myPieChart"  width="30" height="17"></canvas>
              </div>
            </div>
          </div>
          <div class="card-activity">
            <div class="font-24 black-color history-top">Recent Activity</div>
            <div class="history">
              <div class="tab">
                <button class="tablinks active" onclick="openCity(event, 'All')">All</button>
                <button class="tablinks" onclick="openCity(event, 'Deposit')">Deposit</button>
                <button class="tablinks" onclick="openCity(event, 'Decrease')">Decrease</button>
              </div>

              <div id="All" class="tabcontent"  style={{ display:"block" }} >
                <table class="w100">
                  <tbody class="w100">
                    <tr class="w100">
                      <td class="w10">
                        {/* <img class="img-50 radius-12" src="./asset/profile.jpg" alt=""> */}
                      </td>
                      <td class="w20 ">
                        <div class="activity-name">
                          <div class="font-16 black-color">School</div>
                          <div class="font-12 black-color-50">22 Feb, 2024 at 3:30 PM</div>
                        </div>
                      </td>
                      <td class="w25">
                        <div class="font-12 black-color-50">Untuk Biaya SKS Semester 5 Untuk Biaya SKS Semester 5 Untuk Biaya SKS Semester 5</div>
                      </td>
                      <td class="w25 pl6" >
                        <div class="font-14 black-color">Rp 300.000,88</div>
                      </td>
                    </tr>


                  </tbody>
                </table>
              </div>
              
              <div id="Deposit" class="tabcontent">
                <table>
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
              
              <div id="Decrease" class="tabcontent">
                <table>
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js"></script>
    <script src="script.js"></script>
    <script></script>
    </>
  );
}

