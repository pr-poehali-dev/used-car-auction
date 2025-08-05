import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

// Mock data for auction cars
const auctionCars = [
  {
    id: 1,
    brand: 'Hyundai',
    model: 'Genesis G90',
    year: 2022,
    mileage: 15000,
    currentBid: 45000000,
    timeLeft: 3600,
    bids: 12,
    image: '/img/a268ec3f-0760-4522-ad69-456f1c556bd9.jpg',
    vin: 'KMHGH4JA9MA123456',
    status: 'active'
  },
  {
    id: 2,
    brand: 'Kia',
    model: 'Sportage',
    year: 2021,
    mileage: 25000,
    currentBid: 28000000,
    timeLeft: 1800,
    bids: 8,
    image: '/img/c09a2b39-6043-4d34-a689-24bdf5e18990.jpg',
    vin: 'KNDP13AC5L7123456',
    status: 'active'
  },
  {
    id: 3,
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2020,
    mileage: 35000,
    currentBid: 18500000,
    timeLeft: 7200,
    bids: 15,
    image: '/img/84a0d394-83ee-4d79-89e0-8d81d512a44d.jpg',
    vin: 'KMHL14JA1LA123456',
    status: 'active'
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price);
};

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const CarCard = ({ car }: { car: typeof auctionCars[0] }) => {
  const [timeLeft, setTimeLeft] = useState(car.timeLeft);
  const [currentBid, setCurrentBid] = useState(car.currentBid);
  const [bidCount, setBidCount] = useState(car.bids);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBid = () => {
    setCurrentBid(prev => prev + 500000);
    setBidCount(prev => prev + 1);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          className={`absolute top-3 left-3 ${timeLeft < 1800 ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          LIVE
        </Badge>
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-mono">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          {car.brand} {car.model} ({car.year})
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Gauge" size={16} />
            {car.mileage.toLocaleString('ko-KR')} km
          </div>
          <div className="flex items-center gap-1">
            <Icon name="FileText" size={16} />
            VIN: {car.vin.slice(-6)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">현재 입찰가</p>
            <p className="text-2xl font-bold text-auction-blue">
              {formatPrice(currentBid)}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">입찰 수: {bidCount}</span>
            <span className={`font-medium ${timeLeft < 1800 ? 'text-red-500' : 'text-green-500'}`}>
              {timeLeft > 0 ? '경매 진행중' : '경매 종료'}
            </span>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleBid}
              className="flex-1 bg-auction-blue hover:bg-auction-blue/90"
              disabled={timeLeft === 0}
            >
              <Icon name="Gavel" size={16} className="mr-2" />
              입찰하기
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="Heart" size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Car" size={24} className="text-auction-blue" />
                <span className="text-xl font-bold text-auction-navy">KR Auto Auction</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-auction-blue transition-colors">경매</a>
              <a href="#" className="text-gray-600 hover:text-auction-blue transition-colors">구매 방법</a>
              <a href="#" className="text-gray-600 hover:text-auction-blue transition-colors">지원</a>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="outline">로그인</Button>
              <Button className="bg-auction-blue hover:bg-auction-blue/90">회원가입</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-auction-navy via-gray-800 to-auction-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              한국 중고차 온라인 경매
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              투명하고 신뢰할 수 있는 실시간 자동차 경매 플랫폼
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="브랜드 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hyundai">현대</SelectItem>
                    <SelectItem value="kia">기아</SelectItem>
                    <SelectItem value="genesis">제네시스</SelectItem>
                    <SelectItem value="ssangyong">쌍용</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  placeholder="모델명 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-black"
                />
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="연식" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024년</SelectItem>
                    <SelectItem value="2023">2023년</SelectItem>
                    <SelectItem value="2022">2022년</SelectItem>
                    <SelectItem value="2021">2021년</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="bg-auction-blue hover:bg-auction-blue/90">
                  <Icon name="Search" size={20} className="mr-2" />
                  검색
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-auction-navy mb-4">실시간 경매</h2>
            <p className="text-gray-600 text-lg">지금 진행 중인 자동차 경매에 참여하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctionCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-auction-navy mb-4">왜 KR Auto Auction인가?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-auction-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">안전한 거래</h3>
              <p className="text-gray-600">검증된 차량과 투명한 거래 시스템으로 안전한 구매를 보장합니다.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-auction-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">실시간 경매</h3>
              <p className="text-gray-600">실시간으로 진행되는 경매에서 공정한 가격으로 차량을 구매하세요.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-auction-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="FileSearch" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">상세한 정보</h3>
              <p className="text-gray-600">VIN 검증, 차량 이력, 상세 사진 등 완전한 차량 정보를 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Bidding Interface */}
      <section className="py-16 bg-auction-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">실시간 입찰 현황</h2>
            <p className="text-gray-300">현재 가장 인기 있는 경매</p>
          </div>
          
          <div className="bg-white rounded-lg p-8 text-black">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img 
                  src="/img/a268ec3f-0760-4522-ad69-456f1c556bd9.jpg" 
                  alt="Featured car"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">Hyundai Genesis G90 (2022)</h3>
                  <p className="text-gray-600 mt-2">VIN: KMHGH4JA9MA123456 • 15,000 km</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">현재 최고 입찰가</p>
                  <p className="text-4xl font-bold text-auction-blue">₩45,000,000</p>
                  <p className="text-sm text-gray-600 mt-2">12명이 입찰 중</p>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600 mb-2">남은 시간</p>
                  <p className="text-2xl font-bold text-red-600">01:00:00</p>
                </div>
                
                <div className="space-y-3">
                  <Input placeholder="입찰 금액을 입력하세요..." type="number" />
                  <Button className="w-full bg-auction-red hover:bg-auction-red/90 text-lg py-3">
                    <Icon name="Gavel" size={20} className="mr-2" />
                    ₩500,000 높여서 입찰
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500">
                  최소 입찰 단위: ₩500,000 • 입찰 수수료: 3%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Car" size={24} className="text-auction-blue" />
                <span className="text-xl font-bold">KR Auto Auction</span>
              </div>
              <p className="text-gray-400">한국 최고의 중고차 온라인 경매 플랫폼</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">실시간 경매</a></li>
                <li><a href="#" className="hover:text-white transition-colors">차량 검색</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VIN 검증</a></li>
                <li><a href="#" className="hover:text-white transition-colors">구매 가이드</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">고객 지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white transition-colors">고객센터</a></li>
                <li><a href="#" className="hover:text-white transition-colors">라이브 채팅</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">연락처</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 1588-0000</p>
                <p>📧 info@krautoauction.com</p>
                <p>📍 서울시 강남구 테헤란로 123</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KR Auto Auction. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}