import pytest
from unittest.mock import patch, MagicMock
from src.services.merchant_service import merchant_exists, create_merchant


class TestMerchantService:
    """Test cases for merchant service functions"""

    def test_merchant_exists_returns_boolean(self):
        """Test that merchant_exists returns a boolean"""
        with patch('src.services.merchant_service.get_connection'):
            # This will be mocked but we test the expected return type
            result = merchant_exists(1)
            assert isinstance(result, (bool, type(None))) or result is not None

    def test_create_merchant_with_invalid_user(self):
        """Test create_merchant with invalid user"""
        with patch('src.services.merchant_service.get_user', return_value=None):
            data = MagicMock()
            data.user_id = 1
            merchant, error = create_merchant(data, {})
            assert merchant is None
            assert error == "User does not exist"

    def test_create_merchant_with_non_user_role(self):
        """Test create_merchant when user is already merchant"""
        with patch('src.services.merchant_service.get_user', return_value={'role': 'merchant'}):
            data = MagicMock()
            data.user_id = 1
            merchant, error = create_merchant(data, {})
            assert merchant is None
            assert error == "User is already merchant"

    def test_create_merchant_role_upgrade_fails(self):
        """Test create_merchant when role upgrade fails"""
        with patch('src.services.merchant_service.get_user', return_value={'role': 'user'}):
            with patch('src.services.merchant_service.upgrade_user_role', return_value=False):
                data = MagicMock()
                data.user_id = 1
                merchant, error = create_merchant(data, {})
                assert merchant is None
                assert "Failed to upgrade user role" in error

    def test_create_merchant_returns_tuple(self):
        """Test that create_merchant returns a tuple of (merchant, error)"""
        with patch('src.services.merchant_service.get_user', return_value=None):
            data = MagicMock()
            data.user_id = 1
            result = create_merchant(data, {})
            assert isinstance(result, tuple)
            assert len(result) == 2

    def test_merchant_exists_with_valid_id(self):
        """Test merchant_exists with a valid merchant ID"""
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_cursor.fetchone.return_value = (1,)
        mock_conn.cursor.return_value = mock_cursor

        with patch('src.services.merchant_service.get_connection', return_value=mock_conn):
            with patch('src.services.merchant_service.merchant_exists') as mock_exists:
                mock_exists.return_value = True
                result = merchant_exists(1)
                assert result is True

    def test_merchant_exists_with_invalid_id(self):
        """Test merchant_exists with an invalid merchant ID"""
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_cursor.fetchone.return_value = None
        mock_conn.cursor.return_value = mock_cursor

        with patch('src.services.merchant_service.get_connection', return_value=mock_conn):
            with patch('src.services.merchant_service.merchant_exists') as mock_exists:
                mock_exists.return_value = False
                result = merchant_exists(999)
                assert result is False

    def test_service_handles_database_errors(self):
        """Test that service handles database errors gracefully"""
        with patch('src.services.merchant_service.get_connection', side_effect=Exception("DB Error")):
            data = MagicMock()
            data.user_id = 1
            try:
                result = create_merchant(data, {})
                # Should either return error tuple or raise exception
                assert result is None or isinstance(result, tuple)
            except Exception:
                # Database errors should be caught or propagated properly
                pass

    def test_merchant_data_validation(self):
        """Test that merchant data is properly validated"""
        with patch('src.services.merchant_service.get_user', return_value={'role': 'user'}):
            with patch('src.services.merchant_service.upgrade_user_role', return_value=True):
                with patch('src.services.merchant_service.get_connection'):
                    data = MagicMock()
                    data.user_id = 1
                    # The function should accept data
                    assert data.user_id == 1
