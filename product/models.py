from django.db import models
from django.urls import reverse

# Create your models here.
class Category(models.Model):
    category_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['category_id']
        indexes = [
            models.Index(fields=['category_id']),
        ]
        verbose_name = 'category'
        verbose_name_plural = 'categories'
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('product:product_list_by_category', args=[self.id])
    
class Product(models.Model):
    category_id = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    product_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=200)
    image = models.ImageField(blank=True)
    unit = models.CharField(max_length=100, default="1팩")      # 판매단위, "1팩"은 디폴트 값
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    # stock_quantity = models.IntegerField(blank=True)          # 불필요할 거 같아 일단 비활성화
    # created_at = models.DateTimeField(auto_now_add=True)      # 위와 같음
    # updated_at = models.DateTimeField(auto_now=True)          # 위와 같음

    class Meta:
        ordering = ['product_id']
        indexes = [
            models.Index(fields=['product_id']),
            models.Index(fields=['name']),
        ]
    def get_absolute_url(self):
        # reverse를 사용하여 'product_detail' URL 패턴을 사용하여 URL 생성
        return reverse('product_detail', args=[str(self.id)])

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('product:product_detail', args=[self.id])